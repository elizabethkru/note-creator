import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NoteTitle } from '../../../domain/value-objects/note-title';
import { NoteContent } from '../../../domain/value-objects/note-content';
import { NoteAggregate } from '../../../domain/tasks.aggregate';
import { INoteRepository } from '../../ports/note-repository.interface';
import { CreateNoteBoundaries } from '../../ports/boundaries/create-note.boundaries';
import { Inject } from '@nestjs/common';
import { CreateNoteCommand } from './create-note.command';
import { UserUuid } from 'src/modules/users/domain/value-objects/user-uuid';

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler implements ICommandHandler<CreateNoteCommand> {
  constructor(
    @Inject('INoteRepository')
    private readonly repository: INoteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(
    command: CreateNoteCommand,
  ): Promise<CreateNoteBoundaries.Output> {
    const noteTitle = new NoteTitle(command.data.title);
    const noteContent = new NoteContent(command.data.content);
    const userUuid = new UserUuid(command.data.userId);

    const note = NoteAggregate.create(noteTitle, noteContent, userUuid);
    const savedNote = await this.repository.save(note);
    this.eventPublisher.mergeObjectContext(savedNote);

    return {
      id: savedNote.uuid.toString(),
      title: savedNote.title.getTitle(),
      content: savedNote.content.getContent(),
      createdAt: savedNote.updatedAt.toISOString(),
    };
  }
}
