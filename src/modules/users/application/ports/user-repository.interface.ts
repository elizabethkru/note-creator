import { UserAggregate } from '../../domain/user.aggregate';
import { UserLogin } from '../../domain/value-objects/user-login';
import { UserUuid } from '../../domain/value-objects/user-uuid';

export interface IUserRepository {
  save(user: UserAggregate): Promise<UserAggregate>;

  getUserById(userUuid: UserUuid): Promise<UserAggregate | null>;

  getAllUsers(): Promise<UserAggregate[]>;

  findByLogin(UserLogin: UserLogin): Promise<UserAggregate | null>;
}
