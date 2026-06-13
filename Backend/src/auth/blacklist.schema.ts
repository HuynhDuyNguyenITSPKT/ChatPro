import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blacklist {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true, index: { expires: 0 } })
  expiresAt: Date;
}

export type BlacklistDocument = Blacklist & Document;
export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
