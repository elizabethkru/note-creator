import { AggregateRoot } from '@nestjs/cqrs';
import { NoteUuid } from './value-objects/note-uuid';
import { NoteTitle } from './value-objects/note-title';
import { NoteContent } from './value-objects/note-content';

export class NoteAggregate extends AggregateRoot {
  constructor(
    public readonly uuid: NoteUuid,
    public title: NoteTitle,
    public content: NoteContent,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public isDeleted: boolean = false,
  ) {
    super();
  }

  public static create(title: NoteTitle, content: NoteContent): NoteAggregate {
    const uuid = NoteUuid.create();
    const now = new Date();
    return new NoteAggregate(uuid, title, content, now, now);
  }

  public update(title: NoteTitle, content: NoteContent): void {
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }

  public delete(): void {
    this.isDeleted = true;
    this.updatedAt = new Date();
  }

  public withBaseFields(savedNote: {
    uuid: string;
    title: NoteTitle;
    content: NoteContent;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }): NoteAggregate {
    return new NoteAggregate(
      new NoteUuid(savedNote.uuid),
      savedNote.title,
      savedNote.content,
      savedNote.createdAt,
      savedNote.updatedAt,
      savedNote.isDeleted,
    );
  }
}
