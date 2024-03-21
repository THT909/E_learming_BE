import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
@Schema()
export class EssayExam {
  @Prop()
  teacher_id: string;
  @Prop()
  course_id: string;
  @Prop()
  total_time: number;
  @Prop({ type: Date })
  time_start: Date;
  @Prop({ type: Date })
  time_end: Date;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  files: String[];
}
export type EssayExamDocument = EssayExam & Document;
export const EssayExamSchema = SchemaFactory.createForClass(EssayExam);
