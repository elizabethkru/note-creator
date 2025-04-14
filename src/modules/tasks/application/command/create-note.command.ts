// create-note.command-and-handler.ts
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NoteTitle } from '../../tasks/value-objects/note-title';
import { NoteContent } from '../../tasks/value-objects/note-content';
import { NoteAggregate } from '../../tasks/tasks.aggregate';
import { INoteRepository } from '../ports/note-repository.interface';
import { CreateNoteBoundaries } from '../ports/boundaries/create-note.boundaries';
import { Inject } from '@nestjs/common';

export class CreateNoteCommand {
  constructor(public readonly data: CreateNoteBoundaries.Input) {
    console.log('CreateNoteHandler initialized');
  }
}

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

    const note = NoteAggregate.create(noteTitle, noteContent);
    this.eventPublisher.mergeObjectContext(await this.repository.save(note));

    note.commit();

    return {
      id: note.uuid.toString(),
      title: note.title.getTitle(),
      content: note.content.getContent(),
      createdAt: note.createdAt.getDate(),
    };
  }
}
