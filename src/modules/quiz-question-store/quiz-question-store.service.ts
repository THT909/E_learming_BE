import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import {
  QuizQuestionStore,
  QuizQuestionStoreDocument,
} from './quiz-question-store.schema';
import { CreateQuizQuestionStoreDto } from './dto/create-quizQuestionStore.dto';
import { UpdateQuizQuestionStoreDto } from './dto/update-quizQuestionStore.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizQuestionStoreService extends CrudService<
  QuizQuestionStoreDocument,
  CreateQuizQuestionStoreDto,
  UpdateQuizQuestionStoreDto
> {
  constructor(
    @InjectModel(QuizQuestionStore.name)
    readonly model: Model<QuizQuestionStoreDocument>,
  ) {
    super(model);
  }
}
