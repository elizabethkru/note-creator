import { UpdateNoteBoundaries } from '../../ports/boundaries/update-note.boundaries';

export class UpdateNoteCommand {
  constructor(public readonly data: UpdateNoteBoundaries.Input) {}
}
