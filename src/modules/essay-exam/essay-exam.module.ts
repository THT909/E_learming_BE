import { Module } from '@nestjs/common';
import { EssayExamController } from './essay-exam.controller';

@Module({
  controllers: [EssayExamController]
})
export class EssayExamModule {}
