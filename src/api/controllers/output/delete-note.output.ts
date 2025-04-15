import { ApiProperty } from '@nestjs/swagger';

export class DeleteNoteOutput {
  @ApiProperty({
    example: true,
    description: 'Флаг успешного удаления',
  })
  success: boolean;

  @ApiProperty({
    example: 'Заметка успешно удалена',
    description: 'Сообщение о результате',
  })
  message: string;

  @ApiProperty({
    example: '2023-05-15T16:45:00Z',
    description: 'Дата удаления',
    required: false,
  })
  deletedAt?: string;
}
