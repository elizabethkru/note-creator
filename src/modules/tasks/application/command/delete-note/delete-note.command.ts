import { DeleteNoteBoundaries } from '../../ports/boundaries/delete-note.boundaries';

export class DeleteNoteCommand {
  constructor(public readonly data: DeleteNoteBoundaries.Input) {}
}
