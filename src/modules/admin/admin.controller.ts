import { AdminService } from './admin.service';

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
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';
import { get } from 'http';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all Admin' })
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
  @ApiOperation({ summary: 'Create Admin' })
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.service.createAdmin(createAdminDto);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.service.update(id, updateAdminDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
