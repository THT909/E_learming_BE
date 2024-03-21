import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { AdminDocument, Admin } from './admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminService extends CrudService<
  AdminDocument,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(@InjectModel(Admin.name) readonly model: Model<AdminDocument>) {
    super(model);
  }
}
