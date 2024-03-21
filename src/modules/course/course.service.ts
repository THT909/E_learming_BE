import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCategoryDto } from '../category/dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourseService extends CrudService<
  CourseDocument,
  CreateCourseDto,
  UpdateCategoryDto
> {
  constructor(@InjectModel(Course.name) readonly model: Model<CourseDocument>) {
    super(model);
  }
}
