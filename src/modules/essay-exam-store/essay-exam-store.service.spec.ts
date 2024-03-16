import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamStoreService } from './essay-exam-store.service';

describe('EssayExamStoreService', () => {
  let service: EssayExamStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EssayExamStoreService],
    }).compile();

    service = module.get<EssayExamStoreService>(EssayExamStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
