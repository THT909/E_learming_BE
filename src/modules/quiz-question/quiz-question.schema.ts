import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class QuizQuestion {
  @Prop()
  quiz_store_id: string;
  @Prop({ type: String, enum: ['easy', 'middle', 'hard'] })
  level: 'easy' | 'middle' | 'hard';
  @Prop()
  question: string;
  @Prop({
    type: {
      content: { type: String, required: true },
      score: { type: Number, required: true },
    },
  })
  answer: [{ content: string; score: number }];
}
export type QuizQuestionDocument = QuizQuestion & Document;
export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);
