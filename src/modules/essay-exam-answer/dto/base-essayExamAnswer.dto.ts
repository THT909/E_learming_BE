import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class EssayExamAnswerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  essay_exam_Id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  student_id: string;

  @ApiProperty()
  @IsString()
  content_answers: string;

  @ApiProperty()
  @IsString()
  file_upload: string[];

  @IsNotEmpty()
  @IsEnum(['pending', 'confirm'])
  @ApiProperty()
  status: 'pending' | 'confirm';
}
