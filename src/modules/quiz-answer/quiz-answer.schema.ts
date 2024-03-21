import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class QuizAnswer {
  @Prop()
  quiz_exam_id: string;
  @Prop()
  student_id: string;
  @Prop({
    question: { type: String, required: true },
    answer_select: { type: Number },
    score: { type: Number },
  })
  answer: [{ question: string; answer_select: number; score: number }];
  @Prop()
  total_score: number;
}
export type QuizAnswerDocument = QuizAnswer & Document;
export const QuizAnswerSchema = SchemaFactory.createForClass(QuizAnswer);
