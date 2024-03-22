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
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('CURD')
@Controller('User')
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
  @Post('get_data_user')
  @ApiBody({
    schema: { example: { token: 'Input token here' } },
  })
  @ApiResponse({
    status: 200,
    description: 'Get data successfully.',
  })
  async getAccessToken(@Body() body: { token: string }) {
    if (!body.token) {
      throw new HttpException('Token required', HttpStatus.BAD_REQUEST);
    }
    const { token } = body;
    const data = await this.service.getDataUserByToken(token);

    return data;
  }

  // @Get('email/:email')
  // async finByEmail(@Param('email') email: string) {
  //   {
  //     {
  //       try {
  //         console.log('check email:', email);
  //         const user = await this.service.findByEmail(email);
  //         return user;
  //       } catch (error) {
  //         throw new NotFoundException('User not found');
  //       }
  //     }
  //   }
  // }
}
