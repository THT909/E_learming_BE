import {
  Injectable,
  NotFoundException,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { UserDocument, User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService extends CrudService<
  UserDocument,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectModel(User.name) readonly model: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    super(model);
  }
  async findByEmail(email: string) {
    const user = await this.model.findOne({ email: email });
    return user;
  }

  async getById(id: string) {
    const user = await this.model.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
  async createUser(createUserDto: CreateUserDto) {
    const passHash = await this.hashPass(createUserDto.password);
    createUserDto.password = passHash;
    const createdModel = await this.model.create({
      ...createUserDto,
      createAt: new Date(),
    });
    return createdModel;
  }
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = updateUserDto;
    if (data.email || data.role) {
      throw new HttpException(
        { status: 'can change email or role' },
        HttpStatus.FORBIDDEN,
      );
    }
    if (data.password) {
      data.password = await this.hashPass(updateUserDto.password);
    }
    const res = this.update(id, data);
    return res;
  }
  hashPass(pass: string) {
    const salt = this.configService.get('SALT_ROUNDS');
    const hash = bcrypt.hash(pass, parseInt(salt));
    return hash;
  }
}
