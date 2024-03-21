import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class QuizQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  quiz_question_store_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_level_hard: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_level_middle: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_level_easy: number;
}

export class QuizDto {
  @ApiProperty()
  @IsNotEmpty()
  teacher_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_time: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  max_score: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  time_begin: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  time_end: Date;
}
