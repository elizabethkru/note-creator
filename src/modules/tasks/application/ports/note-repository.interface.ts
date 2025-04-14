import { NoteAggregate } from '../../tasks/tasks.aggregate';
import { NoteUuid } from '../../tasks/value-objects/note-uuid';

export interface INoteRepository {
  save(domain: NoteAggregate): Promise<NoteAggregate>;

  getNoteById(domainUuid: NoteUuid): Promise<NoteAggregate | null>;

  getAllNotes(): Promise<NoteAggregate[]>;
}
