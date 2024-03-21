import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() authPayLoad: AuthPayLoadDto) {
    if (!authPayLoad.email || !authPayLoad.password) {
      throw new HttpException(
        'Email or Password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.authService.validateUser(authPayLoad);
    if (!user) {
      throw new HttpException('invalid', 401);
    }
    return user;
  }

  @Post('refresh')
  @ApiBody({
    schema: { example: { refresh_token: 'your_refresh_token_here' } },
  })
  @ApiResponse({
    status: 200,
    description: 'Refreshed access token successfully.',
  })
  async getAccessToken(@Body() body: { refresh_token: string }) {
    if (!body.refresh_token) {
      throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
    }
    const { refresh_token } = body;
    const data = await this.authService.getAccessToken(refresh_token);

    return data;
  }
}
