import { CreateNoteBoundaries } from '../../ports/boundaries/create-note.boundaries';

export class CreateNoteCommand {
  constructor(public readonly data: CreateNoteBoundaries.Input) {}
}
