import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  answer_select: string;

  @ApiProperty()
  @IsNotEmpty()
  score: number;
}

export class QuizAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  quiz_exam_id: string;

  @ApiProperty()
  @IsNotEmpty()
  student_id: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @ApiProperty()
  @IsNotEmpty()
  total_score: number;
}
