import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  score: number;
}

export class QuizQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  quiz_store_id: string;

  @ApiProperty({ enum: ['easy', 'middle', 'hard'] })
  @IsNotEmpty()
  @IsEnum(['easy', 'middle', 'hard'])
  level: 'easy' | 'middle' | 'hard';

  @ApiProperty()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ type: [AnswerDto], description: 'Array of answers' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answer: AnswerDto[];
}
