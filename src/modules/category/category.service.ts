import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { Category, CategoryDocument } from './category.schema';
import { CreateCourseDto } from '../course/dto/create-course.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService extends CrudService<
  CategoryDocument,
  CreateCourseDto,
  UpdateCategoryDto
> {
  constructor(
    @InjectModel(Category.name) readonly model: Model<CategoryDocument>,
  ) {
    super(model);
  }
}
