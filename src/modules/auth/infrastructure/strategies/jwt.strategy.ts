import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from 'src/modules/users/application/ports/user-repository.interface';
import { UserUuid } from 'src/modules/users/domain/value-objects/user-uuid';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string }) {
    try {
      return await this.userRepository.getUserById(
        new UserUuid(payload.sub), // Теперь payload.sub - строка
      );
    } catch (e) {
      throw new UnauthorizedException('Invalid user ID in token');
    }
  }
}
