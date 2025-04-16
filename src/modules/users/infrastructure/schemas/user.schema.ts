import { EntitySchema } from 'typeorm';
import { UserAggregate } from '../../domain/user.aggregate';
import { UserUuid } from '../../domain/value-objects/user-uuid';
import { UserLogin } from '../../domain/value-objects/user-login';
import { HashedPassword } from 'src/modules/auth/domain/value-objects/hashed-password';

export const UsersSchema = new EntitySchema<UserAggregate>({
  name: 'Users',
  target: UserAggregate,
  columns: {
    uuid: {
      type: 'uuid',
      primary: true,
      transformer: {
        to: (value: UserUuid) => value.toString(),
        from: (value: string) => new UserUuid(value),
      },
    },
    login: {
      type: 'varchar',
      length: 20,
      unique: true,
      transformer: {
        to: (value: UserLogin) => value.toString(),
        from: (value: string) => new UserLogin(value),
      },
    },
    password: {
      type: 'varchar',
      length: 255,
      transformer: {
        to: (value: HashedPassword) => value.toString(),
        from: (value: string) => new HashedPassword(value),
      },
    },
    createdAt: {
      type: 'timestamptz',
      nullable: false,
      name: 'created_at',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'timestamptz',
      nullable: false,
      name: 'updated_at',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
});
