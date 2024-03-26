import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
      ignoreExpiration: true,
    });
  }

  validate(payload: JwtPayload) {
    if (payload['exp'] < Date.now() / 1000) {
      throw new UnauthorizedException('Token expired');
    }

    // Nếu token hợp lệ, trả về thông tin người dùng
    return payload;
  }
}
