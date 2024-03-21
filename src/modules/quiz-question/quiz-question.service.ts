import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { QuizQuestionDocument, QuizQuestion } from './quiz-question.schema';
import { CreateQuizQuestionDto } from './dto/create-quizQuestion.dto';
import { UpdateQuizQuestionDto } from './dto/update-quizQuestion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizQuestionService extends CrudService<
  QuizQuestionDocument,
  CreateQuizQuestionDto,
  UpdateQuizQuestionDto
> {
  constructor(
    @InjectModel(QuizQuestion.name) readonly model: Model<QuizQuestionDocument>,
  ) {
    super(model);
  }
}
