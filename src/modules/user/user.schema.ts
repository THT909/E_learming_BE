import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
    },
    required: true,
  })
  name: { first_name: string; last_name: string };
  @Prop()
  birthday: Date;
  @Prop()
  code_account: string;
  @Prop()
  phone_number: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  avatar: string;
  @Prop({ type: String, enum: ['student', 'teacher'] })
  role: 'student' | 'teacher';
  //   @Prop({ type: Types.ObjectId, ref: 'Course' })
  //   Courses: Course[];

  @Prop()
  JWTHash: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
