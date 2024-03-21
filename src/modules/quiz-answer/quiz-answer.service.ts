import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { QuizAnswer, QuizAnswerDocument } from './quiz-answer.schema';
import { CreateQuizAnswerDto } from './dto/create-quizAnswer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quizAnswer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizAnswerService extends CrudService<
  QuizAnswerDocument,
  CreateQuizAnswerDto,
  UpdateQuizAnswerDto
> {
  constructor(
    @InjectModel(QuizAnswer.name) readonly model: Model<QuizAnswerDocument>,
  ) {
    super(model);
  }
}
