import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import * as mongoose from 'mongoose';

class NameDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  first_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  last_name: string;
}

export class UserDto {
  @IsOptional()
  @ApiProperty({ type: NameDto })
  name: NameDto;

  @IsOptional()
  // @IsDate()
  @ApiProperty()
  birthday: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  code_account: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
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

  @IsNotEmpty()
  @IsEnum(['student', 'teacher'])
  @ApiProperty()
  role: 'student' | 'teacher';

  // @IsOptional()
  // @IsArray()
  // @ApiProperty({ type: mongoose.Schema.Types.ObjectId, isArray: true })
  // courses: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  JWTHash: string;
}
