import { IsOptional, IsString } from 'class-validator';
import { UserDto } from './base-user.dto';
export class CreateUserDto extends UserDto {
  @IsString()
  @IsOptional()
  profileImage?: string;
}
