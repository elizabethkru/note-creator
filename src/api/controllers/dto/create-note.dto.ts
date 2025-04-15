import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    example: 'Моя первая заметка',
    description: 'Заголовок заметки',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'Это содержание моей первой заметки...',
    description: 'Текст заметки',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  content: string;
}
