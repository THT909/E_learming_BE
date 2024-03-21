import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quiz {
  @Prop()
  teacher_id: string;
  @Prop()
  title: string;
  @Prop()
  course_id: string;
  @Prop({
    type: {
      quiz_question_store_id: { type: String, required: true },
      total_level_hard: { type: Number },
      total_level_middle: { type: Number },
      total_level_easy: { type: Number },
    },
  })
  question: [
    {
      quiz_question_store_id: string;
      total_level_hard: number;
      total_level_middle: number;
      total_level_easy: number;
    },
  ];

  @Prop()
  total_time: number;
  @Prop()
  max_score: number;
  @Prop()
  time_begin: Date;
  @Prop()
  time_end: Date;
}
export type QuizDocument = Quiz & Document;
export const QuizSchema = SchemaFactory.createForClass(Quiz);
