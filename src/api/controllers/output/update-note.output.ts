import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteOutput } from './create-note.output';

export class UpdateNoteOutput extends CreateNoteOutput {
  @ApiProperty({
    example: '2023-05-15T15:30:00Z',
    description: 'Дата последнего обновления',
  })
  updatedAt: string;
}
