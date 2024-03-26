import {
  Injectable,
  HttpStatus,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { Tokens, JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AdminService } from 'src/modules/admin/admin.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUpUser(dto: CreateUserDto) {
    const user = this.userService.createUser(dto);
    const token = await this.getToken((await user)._id, (await user).role);
    try {
      await this.userService.updateToken((await user)._id, token.refresh_token);
    } catch (error) {
      throw new HttpException(
        'Error update token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return token;
  }

  async signInUser(dto: AuthDto): Promise<Tokens> {
    const user = this.userService.findByEmail(dto.email);
    if (!user) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }
    const validatePassword = await this.userService.comparePass(
      dto.password,
      (await user).password,
    );
    if (validatePassword) {
      const token = await this.getToken((await user)._id, (await user).role);
      try {
        await this.userService.updateToken(
          (await user)._id,
          token.refresh_token,
        );
      } catch (error) {
        throw new HttpException(
          'Error update token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return token;
    }
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  async logoutUser(id: string) {
    const token = null;

    const res = await this.userService.updateToken(id, token);
    return new HttpException('ok', HttpStatus.OK);
  }
  async refreshTokenUser(token: string): Promise<Tokens> {
    console.log(token);

    let verify = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('RT_SECRET'),
    });
    console.log(verify, 'check token');
    let checkExistToken = await this.userService.checkExistToken(
      verify.id,
      token,
    );
    if (checkExistToken) {
      let tokens = await this.getToken(verify.id, verify.role);
      await this.userService.updateToken(verify.id, tokens.refresh_token);
      return tokens;
    } else {
      throw new HttpException('access denied', HttpStatus.FORBIDDEN);
    }
  }

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
  async signInAdmin(dto: AuthDto): Promise<Tokens> {
    const admin = await this.adminService.findByEmail(dto.email);
    if (!admin) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }
    const validatePassword = await this.adminService.comparePass(
      dto.password,
      admin.password,
    );
    if (validatePassword) {
      console.log(admin);
      const token = await this.getToken(admin._id, 'admin');
      try {
        await this.adminService.updateToken(admin._id, token.refresh_token);
      } catch (error) {
        throw new HttpException(
          'Error update token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return token;
    }
    throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async logoutAdmin() {}
  async refreshTokenAdmin() {}
}
