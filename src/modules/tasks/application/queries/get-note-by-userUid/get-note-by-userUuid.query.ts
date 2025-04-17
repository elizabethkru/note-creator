import { GetNoteBoundaries } from '../../ports/boundaries/get-notes.boundaries';

export class GetNoteByUserUuidQuery {
  filters: any;
  constructor(public readonly data: GetNoteBoundaries.InputUserUuid) {}
}
