import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NoteAggregate } from '../../domain/tasks.aggregate';
import { NoteSchema } from '../schemas/note.schema';
import { NoteUuid } from '../../domain/value-objects/note-uuid';
import { INoteRepository } from '../../application/ports/note-repository.interface';
import { BaseRepository } from 'src/modules/shared/ifrastructure/repositories/base.repository';

@Injectable()
export class NoteRepository
  extends BaseRepository<NoteAggregate>
  implements INoteRepository
{
  constructor(@InjectDataSource() connection: DataSource) {
    super(connection, NoteSchema);
  }

  save(note: NoteAggregate): Promise<NoteAggregate> {
    return this.manager.save(note);
  }

  async getNoteById(uuid: NoteUuid): Promise<NoteAggregate | null> {
    return await this.manager.findOne(NoteAggregate, {
      where: { uuid: uuid.toString() },
    });
  }

  async getAllNotes(): Promise<NoteAggregate[]> {
    return await this.manager.find(NoteAggregate);
  }
}
