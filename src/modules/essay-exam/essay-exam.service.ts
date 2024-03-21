import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { EssayExam, EssayExamDocument } from './essay-exam.schema';
import { CreateEssayExamDto } from './dto/create-essayExam.dto';
import { UpdateEssayExamDto } from './dto/update-essayExam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EssayExamService extends CrudService<
  EssayExamDocument,
  CreateEssayExamDto,
  UpdateEssayExamDto
> {
  constructor(
    @InjectModel(EssayExam.name) readonly model: Model<EssayExamDocument>,
  ) {
    super(model);
  }
}
