import { GetAllNoteQueryHandler } from './get-all-notes/get-all-notes.handler';
import { GetNoteQueryHandler } from './get-notes/get-notes.handler';

export const queryHandlers = [GetNoteQueryHandler, GetAllNoteQueryHandler];
