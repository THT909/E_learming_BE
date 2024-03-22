import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}
