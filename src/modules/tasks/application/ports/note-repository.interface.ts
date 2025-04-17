import { UserUuid } from 'src/modules/users/domain/value-objects/user-uuid';
import { NoteAggregate } from '../../domain/tasks.aggregate';
import { NoteUuid } from '../../domain/value-objects/note-uuid';

export interface INoteRepository {
  save(domain: NoteAggregate): Promise<NoteAggregate>;

  getNoteById(domainUuid: NoteUuid): Promise<NoteAggregate | null>;

  getNoteByUserUuId(userUuid: UserUuid): Promise<NoteAggregate[]>;

  getAllNotes(): Promise<NoteAggregate[]>;
}
