import { Module } from '@nestjs/common';
import { QuizAnswerService } from './quiz-answer.service';
import { QuizAnswerController } from './quiz-answer.controller';

@Module({
  providers: [QuizAnswerService],
  controllers: [QuizAnswerController]
})
export class QuizAnswerModule {}
