import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  icon: string;
}
