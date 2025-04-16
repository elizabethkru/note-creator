import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/modules/shared/ifrastructure/repositories/base.repository';
import { UserAggregate } from '../../domain/user.aggregate';
import { IUserRepository } from '../../application/ports/user-repository.interface';
import { UsersSchema } from '../schemas/user.schema';
import { UserUuid } from '../../domain/value-objects/user-uuid';
import { UserLogin } from '../../domain/value-objects/user-login';

@Injectable()
export class UserRepository
  extends BaseRepository<UserAggregate>
  implements IUserRepository
{
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, UsersSchema);
  }

  save(note: UserAggregate): Promise<UserAggregate> {
    return this.manager.save(note);
  }

  async getUserById(uuid: UserUuid): Promise<UserAggregate | null> {
    return await this.manager.findOne(UserAggregate, {
      where: { uuid: uuid.toString() },
    });
  }

  async getAllUsers(): Promise<UserAggregate[]> {
    return await this.manager.find(UserAggregate);
  }

  async findByLogin(UserLogin: UserLogin): Promise<UserAggregate | null> {
    const Data = await this.manager.findOne(UserAggregate, {
      where: { login: UserLogin.toString() },
    });

    if (!Data) return null;

    return Data;
  }
}
