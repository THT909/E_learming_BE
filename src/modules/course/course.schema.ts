import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CourseDocument = Course & Document;
export class Course {
  @Prop()
  name: string;
  @Prop()
  teacher: string;
  @Prop()
  category_id: string;
  @Prop()
  icon: string;
  @Prop({ type: String, enum: ['open', 'close'] })
  status: 'open' | 'close';
}
export const CourseSchema = SchemaFactory.createForClass(Course);
