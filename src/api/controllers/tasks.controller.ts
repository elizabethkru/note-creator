/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateNoteCommand } from 'src/modules/tasks/application/command/create-note.command';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('note')
export class NoteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/')
  @ApiCreatedResponse({ type: CreateNoteDto })
  async createNote(@Body() body: CreateNoteDto) {
    console.log('jfjhjh');
    return this.commandBus.execute(
      new CreateNoteCommand({
        title: body.title,
        content: body.content,
      }),
    );
  }
}
