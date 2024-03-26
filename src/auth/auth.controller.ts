import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { dot } from 'node:test/reporters';
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/signup')
  async signUpLocal(@Body() dto: CreateUserDto) {
    return await this.authService.signUpUser(dto);
  }

  @Post('/user/signin')
  async signInLocal(@Body() dto: AuthDto) {
    return await this.authService.signInUser(dto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/user/logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    if (!user || !user['id']) {
      throw new HttpException(
        'User not found in request',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.authService.logoutUser(user['id']);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/user/refresh')
  async refreshToken(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refreshTokenUser(user['refreshToken']);
  }
}
