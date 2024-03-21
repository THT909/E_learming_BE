import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthPayLoadDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;
}
