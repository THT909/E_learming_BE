import { Module } from '@nestjs/common';
import { EssayExamAnswerService } from './essay-exam-answer.service';

@Module({
  providers: [EssayExamAnswerService]
})
export class EssayExamAnswerModule {}
