import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import {
  EssayExamAnswer,
  EssayExamAnswerDocument,
} from './essay-exam-answer.schema';
import { CreateEssayExamAnswerDto } from './dto/create-essayExamAnswer.dto';
import { UpdateEssayExamAnswerDto } from './dto/update-essayExamAnswer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EssayExamAnswerService extends CrudService<
  EssayExamAnswerDocument,
  CreateEssayExamAnswerDto,
  UpdateEssayExamAnswerDto
> {
  constructor(
    @InjectModel(EssayExamAnswer.name)
    readonly model: Model<EssayExamAnswerDocument>,
  ) {
    super(model);
  }
}
