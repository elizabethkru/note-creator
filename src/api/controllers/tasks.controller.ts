import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateNoteCommand } from 'src/modules/tasks/application/command/create-note/create-note.command';
import { GetNoteDto } from './dto/get-note.dto';
import { GetNoteQuery } from 'src/modules/tasks/application/queries/get-notes/get-notes.query';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UpdateNoteCommand } from 'src/modules/tasks/application/command/update-note/update-note.command';
import { DeleteNoteCommand } from 'src/modules/tasks/application/command/delete-note/delete-note.command';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateNoteOutput } from './output/create-note.output';
import { GetNoteOutput } from './output/get-note.output';
import { UpdateNoteOutput } from './output/update-note.output';
import { DeleteNoteOutput } from './output/delete-note.output';
import { GetAllNoteQuery } from 'src/modules/tasks/application/queries/get-all-notes/get-all-notes.query';
import { AuthGuard } from '@nestjs/passport';
import { UserAggregate } from 'src/modules/users/domain/user.aggregate';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/domain/user-role.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUnauthorizedResponse({ description: 'Необходима авторизация' })
@ApiTags('Notes Management')
@Controller('note')
export class NoteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Создать заметку',
    description: 'Создает новую заметку с указанным заголовком и содержанием',
  })
  @ApiBody({
    type: CreateNoteDto,
    examples: {
      example1: {
        value: {
          title: 'Важная заметка',
          content: 'Это содержание моей важной заметки...',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: CreateNoteOutput,
    description: 'Заметка успешно создана',
    examples: {
      example1: {
        value: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          title: 'Важная заметка',
          content: 'Это содержание моей важной заметки...',
          createdAt: '2023-05-15T10:00:00Z',
        },
        summary: '',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Невалидные данные',
  })
  async createNote(
    @Body() body: CreateNoteDto,
    @Req() req: Request & { user: UserAggregate },
  ): Promise<any> {
    console.log('User ID из токена:', req.user.uuid);
    return await this.commandBus.execute(
      new CreateNoteCommand({
        title: body.title,
        content: body.content,
        userId: req.user.uuid.toString(),
      }),
    );
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Получить все заметки',
    description: 'Возвращает список всех заметок с возможностью фильтрации',
  })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    description: 'Включить удаленные заметки',
    type: Boolean,
    example: false,
  })
  @ApiOkResponse({
    type: [GetNoteOutput],
    description: 'Список заметок',
    examples: {
      example1: {
        value: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            title: 'Заметка 1',
            content: 'Содержание 1',
            createdAt: '2023-05-15T10:00:00Z',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            title: 'Заметка 2',
            content: 'Содержание 2',
            createdAt: '2023-05-15T11:00:00Z',
          },
        ],
        summary: '',
      },
    },
  })
  async getAllNotes(@Query('includeDeleted') includeDeleted?: boolean) {
    return this.queryBus.execute(
      new GetAllNoteQuery({
        includeDeleted: includeDeleted === true,
      }),
    );
  }

  @ApiOkResponse({
    type: [GetNoteOutput],
  })
  @Get(':noteUuid')
  @ApiOperation({
    summary: 'Получить заметку по ID',
    description: 'Возвращает заметку по указанному идентификатору',
  })
  @ApiParam({
    name: 'noteUuid',
    description: 'UUID заметки',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    type: GetNoteOutput,
    description: 'Заметка найдена',
    examples: {
      example1: {
        value: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          title: 'Важная заметка',
          content: 'Содержание заметки',
          createdAt: '2023-05-15T10:00:00Z',
        },
        summary: '',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Заметка не найдена',
  })
  async getNote(@Param() param: GetNoteDto) {
    return this.queryBus.execute(
      new GetNoteQuery({
        noteUuid: param.noteUuid,
      }),
    );
  }

  @ApiOkResponse({
    type: [UpdateNoteOutput],
  })
  @Put(':noteUuid')
  @ApiOperation({
    summary: 'Обновить заметку',
    description: 'Обновляет заголовок и содержание существующей заметки',
  })
  @ApiParam({
    name: 'noteUuid',
    description: 'UUID заметки',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateNoteDto,
    examples: {
      example1: {
        value: {
          title: 'Обновленный заголовок',
          content: 'Обновленное содержание',
        },
      },
    },
  })
  @ApiOkResponse({
    type: UpdateNoteOutput,
    description: 'Заметка обновлена',
    examples: {
      example1: {
        value: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          title: 'Обновленный заголовок',
          content: 'Обновленное содержание',
          createdAt: '2023-05-15T10:00:00Z',
          updatedAt: '2023-05-16T12:00:00Z',
        },
        summary: '',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Заметка не найдена',
  })
  async updateNote(
    @Param('noteUuid') noteUuid: string,
    @Body() body: Omit<UpdateNoteDto, 'noteUuid'>,
  ) {
    return this.commandBus.execute(
      new UpdateNoteCommand({
        id: noteUuid,
        title: body.title,
        content: body.content,
      }),
    );
  }

  @Delete(':noteUuid')
  @ApiOperation({
    summary: 'Удалить заметку',
    description: 'Помечает заметку как удаленную',
  })
  @ApiParam({
    name: 'noteUuid',
    description: 'UUID заметки',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    type: DeleteNoteOutput,
    description: 'Заметка удалена',
    examples: {
      example1: {
        value: {
          success: true,
          message: 'Заметка успешно удалена',
          deletedAt: '2023-05-16T12:00:00Z',
        },
        summary: '',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Заметка не найдена',
  })
  async deleteNote(@Param() noteUuid: GetNoteDto) {
    return this.commandBus.execute(
      new DeleteNoteCommand({ noteUuid: noteUuid.noteUuid }),
    );
  }
}
