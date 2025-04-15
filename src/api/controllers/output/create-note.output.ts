import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteOutput {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Уникальный идентификатор заметки',
  })
  id: string;

  @ApiProperty({
    example: 'Моя первая заметка',
    description: 'Заголовок заметки',
  })
  title: string;

  @ApiProperty({
    example: 'Это содержание моей первой заметки...',
    description: 'Текст заметки',
  })
  content: string;

  @ApiProperty({
    example: '2023-05-15T10:00:00Z',
    description: 'Дата создания в формате ISO',
  })
  createdAt: string;
}
