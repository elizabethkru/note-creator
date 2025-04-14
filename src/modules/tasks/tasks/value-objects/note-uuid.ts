import * as crypto from 'crypto';

export class NoteUuid {
  constructor(private value: string) {}

  static create(): NoteUuid {
    return new NoteUuid(crypto.randomUUID());
  }

  get uuid(): string {
    return this.value;
  }

  toString = (): string => this.value;
}
