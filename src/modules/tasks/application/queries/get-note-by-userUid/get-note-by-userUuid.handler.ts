import { IQueryHandler, QueryHandler, EventPublisher } from '@nestjs/cqrs';
import { INoteRepository } from '../../ports/note-repository.interface';
import { Inject } from '@nestjs/common';
import { GetNoteByUserUuidQuery } from './get-note-by-userUuid.query';
import { GetNoteBoundaries } from '../../ports/boundaries/get-notes.boundaries';
import { UserUuid } from 'src/modules/users/domain/value-objects/user-uuid';

@QueryHandler(GetNoteByUserUuidQuery)
export class GetNoteByUserUUidQueryHandler
  implements IQueryHandler<GetNoteByUserUuidQuery>
{
  constructor(
    @Inject('INoteRepository')
    private readonly repository: INoteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(
    query: GetNoteByUserUuidQuery,
  ): Promise<GetNoteBoundaries.MultipleNotesOutput | null> {
    const userUuid = new UserUuid(query.data.userUuid);
    const Notes = await this.repository.getNoteByUserUuId(userUuid);

    return {
      notes: Notes.map((note) => ({
        id: note.uuid.toString(),
        title: note.title.getTitle(),
        content: note.content.getContent(),
        createdAt: note.createdAt.toISOString(),
      })),
      count: Notes.length,
    };
  }
}
