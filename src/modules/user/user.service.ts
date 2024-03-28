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
import { LoginUserDto } from './dtos/login_user.dto';
import { use } from 'passport';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
import { plainToClass } from 'class-transformer';
@Injectable()
export class UserService extends CrudService<
  UserDocument,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectModel(User.name) readonly model: Model<UserDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super(model);
  }
  async findByEmail(email: string) {
    try {
      const user = await this.model.findOne({ email: email });
      return user;
    } catch (error) {
      throw new HttpException(
        { status: 'Email is not exist ' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async checkExistToken(id: string, rt: string) {
    let check = true;
    const user = await this.model.findOne({
      _id: id,
      JWTHash: rt,
    });
    if (!user) {
      check = false;
    }
    return check;
  }

  async getById(id: string) {
    const user = await this.model.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    if (createUserDto.role !== 'student' && createUserDto.role !== 'teacher') {
      throw new HttpException(
        { status: 'role illegal' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const IsEmail = await this.isValidEmail(createUserDto.email);
    if (IsEmail == false) {
      throw new HttpException(
        { status: 'is not Email' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const passHash = await this.hashPass(createUserDto.password);
    createUserDto.password = passHash;
    const createdModel = await this.create(createUserDto);
    return createdModel;
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
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

  async updateToken(id: string, token: string) {
    try {
      return await this.model.findByIdAndUpdate(id, { JWTHash: token });
    } catch (error) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }

  async getDataByToken(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('Error from server', HttpStatus.FORBIDDEN);
    }
    let data = {
      _id: user._id,
      name: user.name,
      birthday: user.birthday,
      phone_number: user.phone_number,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    };
    const res = { message: 'Get data successfully !', data };
    return res;
  }

  comparePass(pass: string, hashPass: string) {
    return bcrypt.compare(pass, hashPass);
  }
  hashPass(pass: string) {
    const salt = this.configService.get('SALT_ROUNDS');
    const hash = bcrypt.hash(pass, parseInt(salt));
    return hash;
  }
  decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
