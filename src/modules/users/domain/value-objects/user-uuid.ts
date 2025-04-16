import * as crypto from 'crypto';

export class UserUuid {
  constructor(private value: string) {}

  static create(): UserUuid {
    return new UserUuid(crypto.randomUUID());
  }

  get uuid(): string {
    return this.value;
  }

  toString(): string {
    return this.value; // Возвращаем строковое представление
  }
}
