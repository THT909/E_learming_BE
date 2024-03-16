import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamStoreController } from './essay-exam-store.controller';

describe('EssayExamStoreController', () => {
  let controller: EssayExamStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssayExamStoreController],
    }).compile();

    controller = module.get<EssayExamStoreController>(EssayExamStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
