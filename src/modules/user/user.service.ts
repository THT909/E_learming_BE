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

  async signIn({ email, password }: LoginUserDto) {
    const user = await this.findByEmail(email);
    if (!use) {
      return null;
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (validatePassword) {
    }
    const { _id, username } = user.toObject();
    const access_token = this.jwtService.sign({ _id, username });
    const refresh_token = this.jwtService.sign({ _id }, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }
  async getAccessToken(token: string): Promise<any> {
    try {
      const data = await this.decodeToken(token);
      const user: UserDocument = await this.findOne(data._id);
      const { _id, username } = user.toObject();
      const access_token = this.jwtService.sign({ _id, username });
      return { access_token };
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
  }

  async getDataUserByToken(token: string): Promise<any> {
    try {
      const dataToken = await this.decodeToken(token);
      const user = await this.findOne(dataToken._id);
      const { username, name, avatar, role } = user.toObject();
      const data = { username, name, avatar, role };
      return { data };
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
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
