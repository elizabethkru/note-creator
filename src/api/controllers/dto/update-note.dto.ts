import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @Expose()
  @IsString()
  @MinLength(10)
  content: string;
}
