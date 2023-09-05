import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop()
  password: string;
  @Prop({
    unique: true,
  })
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
