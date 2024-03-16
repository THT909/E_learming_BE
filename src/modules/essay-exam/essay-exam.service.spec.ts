import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamService } from './essay-exam.service';

describe('EssayExamService', () => {
  let service: EssayExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EssayExamService],
    }).compile();

    service = module.get<EssayExamService>(EssayExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
