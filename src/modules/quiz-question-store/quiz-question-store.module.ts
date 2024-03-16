import { Module } from '@nestjs/common';
import { QuizQuestionStoreService } from './quiz-question-store.service';
import { QuizQuestionStoreController } from './quiz-question-store.controller';

@Module({
  providers: [QuizQuestionStoreService],
  controllers: [QuizQuestionStoreController]
})
export class QuizQuestionStoreModule {}
