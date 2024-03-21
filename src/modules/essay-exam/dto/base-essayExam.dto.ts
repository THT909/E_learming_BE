import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class EssayExamDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  teacher_id: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  course_id: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  total_time: number;
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  time_start: Date;
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  time_end: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: Text;
  @ApiProperty()
  @IsString()
  @IsOptional()
  content: Text;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  files: String[];
}
