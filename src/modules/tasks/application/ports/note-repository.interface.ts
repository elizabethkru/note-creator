import { NoteAggregate } from '../../domain/tasks.aggregate';
import { NoteUuid } from '../../domain/value-objects/note-uuid';

export interface INoteRepository {
  save(domain: NoteAggregate): Promise<NoteAggregate>;

  getNoteById(domainUuid: NoteUuid): Promise<NoteAggregate | null>;

  getAllNotes(): Promise<NoteAggregate[]>;
}
