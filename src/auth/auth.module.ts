import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';
import { AdminModule } from 'src/modules/admin/admin.module';
import { GoogleStrategy } from './strategies/google.strategy';
@Module({
  imports: [UserModule, AdminModule, JwtModule],
  providers: [AuthService, AtStrategy, RtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
