import { NoteAggregate } from 'src/modules/tasks/domain/tasks.aggregate';
import { NoteUuid } from '../../domain/value-objects/note-uuid';
import { NoteTitle } from '../../domain/value-objects/note-title';
import { NoteContent } from '../../domain/value-objects/note-content';
import { EntitySchema } from 'typeorm';
import { UserUuid } from 'src/modules/users/domain/value-objects/user-uuid';

export const NoteSchema = new EntitySchema<NoteAggregate>({
  name: 'Note',
  target: NoteAggregate,
  columns: {
    uuid: {
      type: 'uuid',
      primary: true,
      transformer: {
        to: (value: NoteUuid) => value.toString(),
        from: (value: string) => new NoteUuid(value),
      },
    },
    title: {
      type: 'varchar',
      length: 255,
      transformer: {
        to: (value: NoteTitle) => value.getTitle(),
        from: (value: string) => new NoteTitle(value),
      },
    },
    content: {
      type: 'text',
      transformer: {
        to: (value: NoteContent) => value.getContent(),
        from: (value: string) => new NoteContent(value),
      },
    },
    userUuid: {
      type: 'uuid',
      name: 'user_uuid',
      transformer: {
        to: (value: UserUuid) => value.toString(),
        from: (value: string) => new UserUuid(value),
      },
    },
    isDeleted: {
      type: 'boolean',
      default: false,
      name: 'is_deleted',
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
