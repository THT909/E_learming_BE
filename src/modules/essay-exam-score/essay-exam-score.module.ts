import { Module } from '@nestjs/common';
import { EssayExamScoreService } from './essay-exam-score.service';

@Module({
  providers: [EssayExamScoreService]
})
export class EssayExamScoreModule {}
