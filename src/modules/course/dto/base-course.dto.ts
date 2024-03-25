import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  teacher: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  category_id: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  icon: string;
  @IsNotEmpty()
  @IsEnum(['open', 'close'])
  @ApiProperty()
  status: 'open' | 'close';
}
