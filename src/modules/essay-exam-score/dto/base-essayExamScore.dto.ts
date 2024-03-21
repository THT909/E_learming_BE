import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EssayExamScoreDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  essay_exam_id: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  essay_exam_answer_id: string;
  @IsNumber()
  @ApiProperty()
  score: number;

  @IsString()
  @ApiProperty()
  comment: string;
}
