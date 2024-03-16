import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamScoreController } from './essay-exam-score.controller';

describe('EssayExamScoreController', () => {
  let controller: EssayExamScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssayExamScoreController],
    }).compile();

    controller = module.get<EssayExamScoreController>(EssayExamScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
