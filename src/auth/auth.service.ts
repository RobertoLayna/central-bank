import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(phone: string, pass: string) {
    const user = await this.usersService.findOne(phone);
    if (user?.password !== pass) {
      throw new UnauthorizedException({ status: 'Fail', message: 'Usuario no encontrado' });
    }
    const payload = { phone: user.phone, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
