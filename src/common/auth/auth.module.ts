import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    AdminModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY_JWT'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
