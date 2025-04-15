import { Module } from '@nestjs/common';
import { NoteController } from './controllers/tasks.controller';
import { NoteModule } from 'src/modules/tasks/note.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  controllers: [NoteController],
  imports: [CqrsModule, NoteModule],
})
export class ApiModule {}
