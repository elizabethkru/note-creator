import { HashedPassword } from 'src/modules/auth/domain/value-objects/hashed-password';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace CreateUserBoundaries {
  export interface Input {
    login: string;
    password: string;
  }

  export interface Output {
    id: string;
    login: string;
    password: HashedPassword;
    createdAt: string;
  }
}
