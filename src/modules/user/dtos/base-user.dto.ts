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

import * as mongoose from 'mongoose';

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

export class UserDto {
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
  code_account: string;

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
