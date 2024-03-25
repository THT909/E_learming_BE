import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/signup')
  async signUpLocal(@Body() dto: CreateUserDto) {
    return await this.authService.signUpUser(dto);
  }

  //   @Post('/local/signin')
  //   signInLocal() {
  //     this.authService.signInUser();
  //   }

  //   @Post('/logout')
  //   logout() {
  //     this.authService.logoutUser();
  //   }

  //   @Post('/refresh')
  //   refreshToken() {
  //     this.authService.refreshTokenUser();
  //   }
}
