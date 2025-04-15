import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({
    example: 'Обновленный заголовок',
    description: 'Новый заголовок заметки',
    required: false,
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'Обновленное содержание заметки...',
    description: 'Новый текст заметки',
    required: false,
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  content: string;
}
