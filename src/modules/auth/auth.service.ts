/* eslint-disable @typescript-eslint/require-await */
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../users/application/ports/user-repository.interface';
import { UserAggregate } from '../users/domain/user.aggregate';
import { UserLogin } from '../users/domain/value-objects/user-login';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<UserAggregate | null> {
    const user = await this.userRepository.findByLogin(new UserLogin(login));
    if (!user) return null;

    const isValid = await user.password.compare(password);
    return isValid ? user : null;
  }

  async login(user: UserAggregate) {
    const payload = {
      sub: user.uuid,
      login: user.login.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
