import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamAnswerService } from './essay-exam-answer.service';

describe('EssayExamAnswerService', () => {
  let service: EssayExamAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EssayExamAnswerService],
    }).compile();

    service = module.get<EssayExamAnswerService>(EssayExamAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
