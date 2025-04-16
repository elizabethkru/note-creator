import * as bcrypt from 'bcrypt';

export class HashedPassword {
  private static readonly SALT_ROUNDS = 10;

  constructor(private readonly value: string) {}

  static async create(plainPassword: string): Promise<HashedPassword> {
    const hash = await bcrypt.hash(plainPassword, this.SALT_ROUNDS);
    return new HashedPassword(hash);
  }

  compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  toString(): string {
    return this.value;
  }
}
