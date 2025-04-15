import { Expose } from 'class-transformer';
import {
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class GetNoteOutput {
  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @Expose()
  @IsString()
  @MinLength(10)
  content: string;

  createdAt: string;
}
