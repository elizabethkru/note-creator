import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthService } from 'src/modules/auth/auth.service';
import { CreateUserCommand } from 'src/modules/users/application/command/create-user/create-user.command';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from 'src/modules/auth/infrastructure/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @Public()
  async register(@Body() body: RegisterUserDto) {
    console.log('tuututututu');
    const user = await this.commandBus.execute(
      new CreateUserCommand({ login: body.login, password: body.password }),
    );
    console.log(user);
    return this.authService.login(user);
  }

  @Post('login')
  @Public()
  async login(@Body() body: RegisterUserDto) {
    const user = await this.authService.validateUser(body.login, body.password);
    if (!user) throw new UnauthorizedException();

    console.log(user);
    return this.authService.login(user);
  }
}
