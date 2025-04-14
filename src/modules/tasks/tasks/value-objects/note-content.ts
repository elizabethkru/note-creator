export class NoteContent {
  constructor(private value: string) {}

  getContent(): string {
    return this.value;
  }
}
