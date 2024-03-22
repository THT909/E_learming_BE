import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { AdminDocument, Admin } from './admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService extends CrudService<
  AdminDocument,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(
    @InjectModel(Admin.name) readonly model: Model<AdminDocument>,
    private configService: ConfigService,
  ) {
    super(model);
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

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  hashPass(pass: string) {
    const salt = this.configService.get('SALT_ROUNDS');
    const hash = bcrypt.hash(pass, parseInt(salt));
    return hash;
  }
}
