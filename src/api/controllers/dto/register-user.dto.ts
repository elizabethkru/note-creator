import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'LoginUser',
    description: 'Логин',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string;

  @ApiProperty({
    example: 'dkjfkfh4559980',
    description: 'Пароль',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  password: string;
}
