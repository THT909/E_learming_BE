import { Test, TestingModule } from '@nestjs/testing';
import { QuizQuestionStoreController } from './quiz-question-store.controller';

describe('QuizQuestionStoreController', () => {
  let controller: QuizQuestionStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizQuestionStoreController],
    }).compile();

    controller = module.get<QuizQuestionStoreController>(QuizQuestionStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
