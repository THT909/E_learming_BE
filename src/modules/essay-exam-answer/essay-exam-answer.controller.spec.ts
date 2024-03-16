import { Test, TestingModule } from '@nestjs/testing';
import { EssayExamAnswerController } from './essay-exam-answer.controller';

describe('EssayExamAnswerController', () => {
  let controller: EssayExamAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssayExamAnswerController],
    }).compile();

    controller = module.get<EssayExamAnswerController>(EssayExamAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
