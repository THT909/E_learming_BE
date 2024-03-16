import { Test, TestingModule } from '@nestjs/testing';
import { QuizExamController } from './quiz-exam.controller';

describe('QuizExamController', () => {
  let controller: QuizExamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizExamController],
    }).compile();

    controller = module.get<QuizExamController>(QuizExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
