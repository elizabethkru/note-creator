import { CreateNoteHandler } from './create-note/create-note.handler';
import { UpdateNoteHandler } from './update-note/update-note.handler';
import { DeleteNoteHandler } from './delete-note/delete-note.handler';

export const commandHandlers = [
  CreateNoteHandler,
  UpdateNoteHandler,
  DeleteNoteHandler,
];
