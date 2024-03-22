import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Headers,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async index() {
    return await this.service.findAll();
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    try {
      // console.log('check id', id);
      const data = await this.service.findOne(id);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @ApiOperation({ summary: 'Create User' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.createUser(createUserDto);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    return await this.service.updateUser(id, UpdateUserDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
  @ApiTags('User service')
  @Get('get/get-data-user/')
  @ApiHeader({
    name: 'token',
    description: 'input token here',
  })
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  // @UseGuards(AuthGuard)
  async getAccessToken(@Headers() header) {
    if (!header) {
      throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
    }
    const data = await this.service.getDataUserByToken(header.token);
    return data;
  }
}
