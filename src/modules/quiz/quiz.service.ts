import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import { QuizDocument, Quiz } from './quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizService extends CrudService<
  QuizDocument,
  CreateQuizDto,
  UpdateQuizDto
> {
  constructor(@InjectModel(Quiz.name) readonly model: Model<QuizDocument>) {
    super(model);
  }
}
