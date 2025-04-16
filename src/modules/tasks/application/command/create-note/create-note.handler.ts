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
  ) {
    console.log('CreateNoteHandler dependencies initialized');
  }

  async execute(
    command: CreateNoteCommand,
  ): Promise<CreateNoteBoundaries.Output> {
    const noteTitle = new NoteTitle(command.data.title);
    const noteContent = new NoteContent(command.data.content);
    const userUuid = new UserUuid(command.data.userId);

    const note = NoteAggregate.create(noteTitle, noteContent, userUuid);
    this.eventPublisher.mergeObjectContext(await this.repository.save(note));

    // note.commit();
    console.log(34124124);
    return {
      id: note.uuid.toString(),
      title: note.title.getTitle(),
      content: note.content.getContent(),
      createdAt: note.updatedAt.toISOString(),
    };
  }
}
