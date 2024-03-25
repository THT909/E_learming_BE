import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { Tokens, JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUpUser(dto: CreateUserDto) {
    const user = this.userService.createUser(dto);
    const token = await this.getToken((await user)._id, (await user).role);
    return token;
  }
  async signInUser() {}
  async logoutUser() {}
  async refreshTokenUser() {}

  async signUpAdmin() {}
  async signInAdmin() {}
  async logoutAdmin() {}
  async refreshTokenAdmin() {}

  async getToken(id: string, role: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: id,
      role: role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: this.configService.get<string>('AT_EXP'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: this.configService.get<string>('RT_EXP'),
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
