import { Test, TestingModule } from '@nestjs/testing';
import { QuizExamService } from './quiz-exam.service';

describe('QuizExamService', () => {
  let service: QuizExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizExamService],
    }).compile();

    service = module.get<QuizExamService>(QuizExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
