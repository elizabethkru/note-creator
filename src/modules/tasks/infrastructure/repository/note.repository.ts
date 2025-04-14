import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteAggregate } from '../../tasks/tasks.aggregate';
import { NoteSchema } from '../schemas/note.schema';
import { NoteUuid } from '../../tasks/value-objects/note-uuid';
import { INoteRepository } from '../../application/ports/note-repository.interface';

@Injectable()
export class NoteRepository implements INoteRepository {
  constructor(
    @InjectRepository(NoteSchema)
    private readonly repository: Repository<NoteAggregate>,
  ) {}

  async save(note: NoteAggregate): Promise<NoteAggregate> {
    const savedNote = await this.repository.save(note);
    return note.withBaseFields({
      uuid: savedNote.uuid.toString(),
      title: savedNote.title,
      content: savedNote.content,
      createdAt: savedNote.createdAt,
      updatedAt: savedNote.updatedAt,
      isDeleted: savedNote.isDeleted,
    });
  }

  async getNoteById(uuid: NoteUuid): Promise<NoteAggregate | null> {
    const note = await this.repository.findOne({
      where: { uuid: uuid.toString() },
    });
    return note ? this.mapToAggregate(note) : null;
  }

  async getAllNotes(): Promise<NoteAggregate[]> {
    const notes = await this.repository.find();
    return notes.map((note) => this.mapToAggregate(note));
  }

  private mapToAggregate(note: NoteAggregate): NoteAggregate {
    return new NoteAggregate(
      new NoteUuid(note.uuid.toString()),
      note.title,
      note.content,
      note.createdAt,
      note.updatedAt,
      note.isDeleted,
    );
  }
}
