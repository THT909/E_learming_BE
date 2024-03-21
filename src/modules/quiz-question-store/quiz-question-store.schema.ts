import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class QuizQuestionStore {
  @Prop()
  title: String;
  @Prop()
  owner: string;
  @Prop()
  is_share: boolean;
}
export type QuizQuestionStoreDocument = QuizQuestionStore & Document;
export const QuizQuestionStoreSchema =
  SchemaFactory.createForClass(QuizQuestionStore);
