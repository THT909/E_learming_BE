import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class QuizExamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quiz_id: string;
  @ApiProperty()
  @IsArray()
  question: string[];
}
