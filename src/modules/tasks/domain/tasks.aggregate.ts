import { AggregateRoot } from '@nestjs/cqrs';
import { NoteUuid } from './value-objects/note-uuid';
import { NoteTitle } from './value-objects/note-title';
import { NoteContent } from './value-objects/note-content';
import { UserUuid } from 'src/modules/users/domain/value-objects/user-uuid';

export class NoteAggregate extends AggregateRoot {
  constructor(
    public readonly uuid: NoteUuid,
    public title: NoteTitle,
    public content: NoteContent,
    public readonly userUuid: UserUuid,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public isDeleted: boolean = false,
    //public readonly userUuid: UserUuid,
  ) {
    super();
  }

  public static create(
    title: NoteTitle,
    content: NoteContent,
    userUuid: UserUuid,
  ): NoteAggregate {
    const uuid = NoteUuid.create();
    const now = new Date();
    return new NoteAggregate(uuid, title, content, userUuid, now, now);
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
}
