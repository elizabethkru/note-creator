import { GetNoteBoundaries } from '../../ports/boundaries/get-notes.boundaries';

export class GetNoteQuery {
  constructor(public readonly data: GetNoteBoundaries.Input) {}
}
