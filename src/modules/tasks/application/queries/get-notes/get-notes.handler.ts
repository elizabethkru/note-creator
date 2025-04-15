import { IQueryHandler, QueryHandler, EventPublisher } from '@nestjs/cqrs';
import { INoteRepository } from '../../ports/note-repository.interface';
import { Inject } from '@nestjs/common';
import { GetNoteQuery } from './get-notes.query';
import { GetNoteBoundaries } from '../../ports/boundaries/get-notes.boundaries';
import { NoteUuid } from 'src/modules/tasks/domain/value-objects/note-uuid';

@QueryHandler(GetNoteQuery)
export class GetNoteQueryHandler implements IQueryHandler<GetNoteQuery> {
  constructor(
    @Inject('INoteRepository')
    private readonly repository: INoteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
    console.log('CreateNoteHandler dependencies initialized');
  }

  async execute(query: GetNoteQuery): Promise<GetNoteBoundaries.Output | null> {
    const noteUuid = new NoteUuid(query.data.noteUuid);
    const Notes = await this.repository.getNoteById(noteUuid);

    if (!Notes) {
      return null;
    }

    return {
      id: Notes.uuid.toString(),
      title: Notes.title.getTitle(),
      content: Notes.content.getContent(),
      createdAt: Notes.updatedAt.toISOString(),
    };
  }
}
