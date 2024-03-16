import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamController } from './essay-exam.controller';

describe('EssayExamController', () => {
  let controller: EssayExamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssayExamController],
    }).compile();

    controller = module.get<EssayExamController>(EssayExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
