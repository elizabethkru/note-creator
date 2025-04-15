import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { INoteRepository } from '../../ports/note-repository.interface';
import { Inject } from '@nestjs/common';
import { DeleteNoteCommand } from './delete-note.command';
import { NoteUuid } from 'src/modules/tasks/domain/value-objects/note-uuid';
import { DeleteNoteBoundaries } from '../../ports/boundaries/delete-note.boundaries';

@CommandHandler(DeleteNoteCommand)
export class DeleteNoteHandler implements ICommandHandler<DeleteNoteCommand> {
  constructor(
    @Inject('INoteRepository')
    private readonly repository: INoteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(
    command: DeleteNoteCommand,
  ): Promise<DeleteNoteBoundaries.Output> {
    const noteUuid = new NoteUuid(command.data.noteUuid);
    const note = await this.repository.getNoteById(noteUuid);

    if (!note) {
      return {
        success: false,
        message: 'Note not found',
      };
    }

    if (note.isDeleted) {
      return {
        success: false,
        message: 'Note already deleted',
      };
    }

    const noteAggregate = this.eventPublisher.mergeObjectContext(note);
    noteAggregate.delete();

    await this.repository.save(noteAggregate);
    noteAggregate.commit();

    return {
      success: true,
      message: 'Note successfully deleted',
      deletedAt: noteAggregate.updatedAt.toISOString(),
    };
  }
}
