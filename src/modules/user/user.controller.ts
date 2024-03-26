import {
  Body,
  Get,
  Put,
  Res,
  Post,
  Param,
  Delete,
  Headers,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  UploadedFile,
  HttpException,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';
const PUBLIC_DIR = join(__dirname, '..', '..', '..', 'public');

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
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = join(PUBLIC_DIR, file.originalname);
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error('Error saving file:', err);
        return;
      }
      console.log('File saved successfully:', filePath);
    });
  }

  @Get('image/:imageName')
  async getImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const imagePath = join(__dirname, '..', '..', '..', 'public', imageName);
    res.sendFile(imagePath);
  }
}
