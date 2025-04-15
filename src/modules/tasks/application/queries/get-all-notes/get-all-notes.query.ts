export class GetAllNoteQuery {
  constructor(
    public readonly filters?: {
      includeDeleted?: boolean;
    },
  ) {}
}
