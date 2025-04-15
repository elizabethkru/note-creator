import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { GetNoteBoundaries } from 'src/modules/tasks/application/ports/boundaries/get-notes.boundaries';

export class GetNoteDto implements GetNoteBoundaries.Input {
  @ApiProperty({
    format: 'uuid',
  })
  @Expose()
  @IsUUID()
  @IsNotEmpty()
  noteUuid: string;
}
