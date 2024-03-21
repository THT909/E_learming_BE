import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() authPayLoad: AuthPayLoadDto) {
    const user = this.authService.validateUser(authPayLoad);
    if (!user) {
      throw new HttpException('invalid', 401);
    }
    return user;
  }
}
