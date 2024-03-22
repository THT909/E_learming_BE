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

import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: UserService) {}

  @Post('sign_in')
  login(@Body() authPayLoad: AuthPayLoadDto) {
    if (!authPayLoad.email || !authPayLoad.password) {
      throw new HttpException(
        'Email or Password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.authService.signIn(authPayLoad);
    if (!user) {
      throw new HttpException('invalid', 401);
    }
    return user;
  }

  @Post('refresh')
  @ApiBody({
    schema: { example: { refresh_token: 'Input token here' } },
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
