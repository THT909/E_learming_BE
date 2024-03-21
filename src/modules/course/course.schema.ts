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
}
export const CourseSchema = SchemaFactory.createForClass(Course);
