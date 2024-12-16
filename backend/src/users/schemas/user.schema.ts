import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  _id: any;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Ensemble' }] })
  ensembles: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
