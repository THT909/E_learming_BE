import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/CRUD.service';
import {
  EssayExamScoreDocument,
  EssayExamScore,
} from './essay-exam-score.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateEssayExamScoreDto } from './dto/update-essayExamScore.dto';
import { CreateEssayExamScoreDto } from './dto/create-essayExamScore.dto';
import { Model } from 'mongoose';

@Injectable()
export class EssayExamScoreService extends CrudService<
  EssayExamScoreDocument,
  CreateEssayExamScoreDto,
  UpdateEssayExamScoreDto
> {
  constructor(
    @InjectModel(EssayExamScore.name)
    readonly model: Model<EssayExamScoreDocument>,
  ) {
    super(model);
  }
}
