import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Admin {
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
  phone_umber: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  avatar: string;
}
export type AdminDocument = Admin & Document;
export const AdminSchema = SchemaFactory.createForClass(Admin);
