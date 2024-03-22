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
import { AdminService } from 'src/modules/admin/admin.service';
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
  ) {}

  @Post('user/sign-in')
  login(@Body() authPayLoad: AuthPayLoadDto) {
    if (!authPayLoad.email || !authPayLoad.password) {
      throw new HttpException(
        'Email or Password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.userService.signIn(authPayLoad);
    if (!user) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Post('user/refresh')
  @ApiBody({
    schema: { example: { refresh_token: 'Input token here' } },
  })
  @ApiResponse({
    status: 200,
    description: 'Refreshed access token successfully.',
  })
  async getAccessTokenUser(@Body() body: { refresh_token: string }) {
    if (!body.refresh_token) {
      throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
    }
    const { refresh_token } = body;
    const data = await this.userService.getAccessToken(refresh_token);

    return data;
  }

  @Post('admin/sign-in')
  loginAdmin(@Body() authPayLoad: AuthPayLoadDto) {
    if (!authPayLoad.email || !authPayLoad.password) {
      throw new HttpException(
        'Email or Password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.adminService.signIn(authPayLoad);
    if (!user) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Post('admin/refresh')
  @ApiBody({
    schema: { example: { refresh_token: 'Input token here' } },
  })
  @ApiResponse({
    status: 200,
    description: 'Refreshed access token successfully.',
  })
  async getAccessTokenAdmin(@Body() body: { refresh_token: string }) {
    if (!body.refresh_token) {
      throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
    }
    const { refresh_token } = body;
    const data = await this.adminService.getAccessToken(refresh_token);

    return data;
  }
}
