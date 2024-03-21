import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class QuizExam {
  @Prop()
  quiz_id: string;
  @Prop()
  question: string[];
}
export type QuizExamDocument = QuizExam & Document;
export const QuizExamSchema = SchemaFactory.createForClass(QuizExam);
