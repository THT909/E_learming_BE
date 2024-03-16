import { Test, TestingModule } from '@nestjs/testing';
import { QuizQuestionStoreService } from './quiz-question-store.service';

describe('QuizQuestionStoreService', () => {
  let service: QuizQuestionStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizQuestionStoreService],
    }).compile();

    service = module.get<QuizQuestionStoreService>(QuizQuestionStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
