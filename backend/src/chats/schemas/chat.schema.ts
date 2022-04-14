import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from 'src/message/schemas/message.schema';
import { User } from 'src/users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ trim: true })
  chatName: string;

  @Prop({ default: false })
  isGroupChat: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  latestMessage: Message;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  groupAdmin: User;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
