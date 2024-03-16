import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';

@Module({
  providers: [QuizQuestionService],
  controllers: [QuizQuestionController]
})
export class QuizQuestionModule {}
