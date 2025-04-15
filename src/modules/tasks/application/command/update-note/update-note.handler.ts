import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { NoteTitle } from '../../../domain/value-objects/note-title';
import { NoteContent } from '../../../domain/value-objects/note-content';
import { INoteRepository } from '../../ports/note-repository.interface';
import { Inject } from '@nestjs/common';
import { UpdateNoteCommand } from './update-note.command';
import { UpdateNoteBoundaries } from '../../ports/boundaries/update-note.boundaries';
import { NoteUuid } from 'src/modules/tasks/domain/value-objects/note-uuid';

@CommandHandler(UpdateNoteCommand)
export class UpdateNoteHandler implements ICommandHandler<UpdateNoteCommand> {
  constructor(
    @Inject('INoteRepository')
    private readonly repository: INoteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(
    command: UpdateNoteCommand,
  ): Promise<UpdateNoteBoundaries.Output | null> {
    const noteUuid = new NoteUuid(command.data.id);

    if (!noteUuid) {
      return null;
    }
    const note = await this.repository.getNoteById(noteUuid);
    if (!note) {
      return null;
    }

    const noteTitle = new NoteTitle(command.data.title);
    const noteContent = new NoteContent(command.data.content);

    note.update(noteTitle, noteContent);

    // Сохраняем обновлённую заметку
    const updatedNote = this.eventPublisher.mergeObjectContext(
      await this.repository.save(note),
    );

    updatedNote.commit();

    return {
      id: updatedNote.uuid.toString(),
      title: updatedNote.title.getTitle(),
      content: updatedNote.content.getContent(),
      createdAt: updatedNote.createdAt.toISOString(),
      updatedAt: updatedNote.updatedAt.toISOString(),
    };
  }
}
