import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { INoteRepository } from '../../ports/note-repository.interface';
import { Inject } from '@nestjs/common';
import { GetAllNoteQuery } from './get-all-notes.query';
import { GetNoteBoundaries } from '../../ports/boundaries/get-notes.boundaries';

@QueryHandler(GetAllNoteQuery)
export class GetAllNoteQueryHandler implements IQueryHandler<GetAllNoteQuery> {
  constructor(
    @Inject('INoteRepository')
    private readonly repository: INoteRepository,
  ) {}

  async execute(
    query: GetAllNoteQuery,
  ): Promise<GetNoteBoundaries.MultipleNotesOutput> {
    const notes = await this.repository.getAllNotes();

    if (!notes || notes.length === 0) {
      return { notes: [], count: 0 };
    }

    const activeNotes = notes.filter(
      (note) => note.isDeleted == query.filters?.includeDeleted,
    );

    return {
      notes: activeNotes.map((note) => ({
        id: note.uuid.toString(),
        title: note.title.getTitle(),
        content: note.content.getContent(),
        createdAt: note.createdAt.toISOString(),
      })),
      count: activeNotes.length,
    };
  }
}
