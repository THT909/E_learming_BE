import { Module } from '@nestjs/common';
import { EssayExamStoreService } from './essay-exam-store.service';

@Module({
  providers: [EssayExamStoreService]
})
export class EssayExamStoreModule {}
