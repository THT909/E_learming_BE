import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class EssayExamAnswer {
  @Prop()
  essay_exam_id: string;
  @Prop()
  student_id: string;
  @Prop()
  content_answer: string;
  @Prop()
  file_upload: string[];
  @Prop({ type: String, enum: ['pending', 'confirm'] })
  status: 'pending' | 'confirm';
}
export type EssayExamAnswerDocument = EssayExamAnswer & Document;
export const EssayExamAnswerSchema =
  SchemaFactory.createForClass(EssayExamAnswer);
