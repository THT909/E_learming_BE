import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class QuizQuestionStoreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  owner: string;

  @ApiProperty()
  @IsBoolean()
  share: boolean;
}
