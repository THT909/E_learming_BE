import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { AdminDocument, Admin } from './admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService extends CrudService<
  AdminDocument,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(
    @InjectModel(Admin.name) readonly model: Model<AdminDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super(model);
  }
  async findByEmail(email: string) {
    const user = await this.model.findOne({ email: email });
    return user;
  }

  async createAdmin(createDto: CreateAdminDto): Promise<AdminDocument> {
    const IsEmail = await this.isValidEmail(createDto.email);
    if (IsEmail == false) {
      throw new HttpException(
        { status: 'is not Email' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const passHash = await this.hashPass(createDto.password);
    createDto.password = passHash;
    const data = await this.create(createDto);
    return data;
  }

  async updateAdmin(
    id: string,
    update: UpdateAdminDto,
  ): Promise<AdminDocument> {
    const data = update;
    if (data.email) {
      throw new HttpException(
        { status: 'can change email or role' },
        HttpStatus.FORBIDDEN,
      );
    }
    if (data.password) {
      data.password = await this.hashPass(update.password);
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

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  hashPass(pass: string) {
    const salt = this.configService.get('SALT_ROUNDS');
    const hash = bcrypt.hash(pass, parseInt(salt));
    return hash;
  }
  decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
  comparePass(pass: string, hashPass: string) {
    return bcrypt.compare(pass, hashPass);
  }
}
