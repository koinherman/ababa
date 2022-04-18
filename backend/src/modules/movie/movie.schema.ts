import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from '../user/user.schema';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true, collection: 'movies' })
export class Movie extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  video: string;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User;

  createdAt?: Date;
  updatedAt?: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
