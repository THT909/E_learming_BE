import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDate,
  IsOptional,
  IsEnum,
  IsArray,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class NameDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  last_name: string;
}
export class AdminDto {
  @IsNotEmpty()
  @ApiProperty({ type: NameDto })
  name: NameDto;

  @IsOptional()
  // @IsDate()
  @ApiProperty()
  birthday: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  // @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  JWTHash: string;
}
