import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EssayExamScore {
  @Prop()
  essay_exam_id: string;
  @Prop()
  essay_exam_answer_id: string;
  @Prop()
  score: number;
  @Prop()
  comment: string;
}
export type EssayExamScoreDocument = EssayExamScore & Document;
export const EssayExamScoreSchema =
  SchemaFactory.createForClass(EssayExamScore);
