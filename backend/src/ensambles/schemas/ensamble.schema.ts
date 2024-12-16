import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ensemble extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  instrument: string;

  @Prop()
  city: string;

  @Prop()
  ensembleName: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  musicians: Types.ObjectId[];
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
