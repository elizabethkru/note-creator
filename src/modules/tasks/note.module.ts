import { Module } from '@nestjs/common';
import { commandHandlers } from './application/command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteSchema } from './infrastructure/schemas/note.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { NoteRepository } from './infrastructure/repository/note.repository';
import { eventHandlers } from './application/event-handlers';
import { queryHandlers } from './application/queries';
import { HttpModule } from '@nestjs/axios';
import { NoteController } from 'src/api/controllers/tasks.controller';
import { CommandBus } from '@nestjs/cqrs';
import { QueryBus } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([NoteSchema]), CqrsModule, HttpModule],
  providers: [
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    {
      provide: 'INoteRepository',
      useClass: NoteRepository,
    },
  ],
  controllers: [NoteController],
  exports: [CommandBus, QueryBus],
})
export class NoteModule {}
