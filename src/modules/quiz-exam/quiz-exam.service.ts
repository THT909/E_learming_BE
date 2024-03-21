import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { QuizExam, QuizExamDocument } from './quiz-exam.schema';
import { CreateQuizExamDto } from './dto/create-quizExam.dto';
import { UpdateQuizExamDto } from './dto/update-quizExam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizExamService extends CrudService<
  QuizExamDocument,
  CreateQuizExamDto,
  UpdateQuizExamDto
> {
  constructor(
    @InjectModel(QuizExam.name) readonly model: Model<QuizExamDocument>,
  ) {
    super(model);
  }
}
