import { AggregateRoot } from '@nestjs/cqrs';
import { UserUuid } from './value-objects/user-uuid';
import { UserLogin } from './value-objects/user-login';
import { HashedPassword } from 'src/modules/auth/domain/value-objects/hashed-password';

export class UserAggregate extends AggregateRoot {
  constructor(
    public readonly uuid: UserUuid,
    public login: UserLogin,
    public password: HashedPassword,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public static async create(
    login: UserLogin,
    hashedPassword: HashedPassword,
  ): Promise<UserAggregate> {
    const uuid = UserUuid.create();
    const now = new Date();
    return new UserAggregate(uuid, login, hashedPassword, now, now);
  }
}
