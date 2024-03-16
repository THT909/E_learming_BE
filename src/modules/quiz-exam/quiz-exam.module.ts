import { Module } from '@nestjs/common';
import { QuizExamService } from './quiz-exam.service';
import { QuizExamController } from './quiz-exam.controller';

@Module({
  providers: [QuizExamService],
  controllers: [QuizExamController]
})
export class QuizExamModule {}
