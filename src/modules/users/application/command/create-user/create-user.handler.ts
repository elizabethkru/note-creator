import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { IUserRepository } from '../../ports/user-repository.interface';
import { CreateUserBoundaries } from '../../ports/boundaries/create-user.boundaries';
import { UserAggregate } from 'src/modules/users/domain/user.aggregate';
import { UserLogin } from 'src/modules/users/domain/value-objects/user-login';
import { HashedPassword } from 'src/modules/auth/domain/value-objects/hashed-password';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('IUserRepository')
    private readonly repository: IUserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<CreateUserBoundaries.Output> {
    const userLogin = new UserLogin(command.data.login);
    const hashedPassword = await HashedPassword.create(command.data.password);

    const user = await UserAggregate.create(userLogin, hashedPassword);

    this.eventPublisher.mergeObjectContext(await this.repository.save(user));

    return {
      id: user.uuid.toString(),
      login: user.login.toString(),
      password: user.password,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
