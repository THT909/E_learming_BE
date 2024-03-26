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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from '../auth/role.guard';
import { HasRoles } from './hasRole.decorator';
import { Role } from 'src/common/role.enum';
import { log } from 'console';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/signup')
  async signUpLocal(@Body() dto: CreateUserDto) {
    return await this.authService.signUpUser(dto);
  }

  @Post('/user/signin')
  async signInUser(@Body() dto: AuthDto) {
    return await this.authService.signInUser(dto);
  }
  @Post('/admin/signin')
  async signInAdmin(@Body() dto: AuthDto) {
    return await this.authService.signInAdmin(dto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  // @HasRoles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/user/logout')
  async logoutUser(@Req() req: Request) {
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
  // @HasRoles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/admin/logout/')
  async logoutAdmin(@Req() req: Request) {
    const user = req.user;
    console.log(user);
    if (!user || !user['id']) {
      user;
      throw new HttpException(
        'User not found in request',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.authService.logoutAdmin(user['id']);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/user/refresh')
  async refreshTokenUser(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refreshTokenUser(user['refreshToken']);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard('jwt-refresh'), RolesGuard)
  @Post('/admin/refresh')
  async refreshTokenAdmin(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refreshTokenAdmin(user['refreshToken']);
  }
}
