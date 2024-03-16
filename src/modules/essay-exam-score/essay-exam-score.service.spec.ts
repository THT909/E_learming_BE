import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamScoreService } from './essay-exam-score.service';

describe('EssayExamScoreService', () => {
  let service: EssayExamScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EssayExamScoreService],
    }).compile();

    service = module.get<EssayExamScoreService>(EssayExamScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
