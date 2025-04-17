import { GetAllNoteQueryHandler } from './get-all-notes/get-all-notes.handler';
import { GetNoteByUserUUidQueryHandler } from './get-note-by-userUid/get-note-by-userUuid.handler';
import { GetNoteQueryHandler } from './get-notes/get-notes.handler';

export const queryHandlers = [
  GetNoteQueryHandler,
  GetAllNoteQueryHandler,
  GetNoteByUserUUidQueryHandler,
];
