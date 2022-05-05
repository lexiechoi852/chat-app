import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from 'src/chats/schemas/chat.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(userId: string, dto: CreateMessageDto) {
    const { content, chatId } = dto;
    try {
      const newMessage = await this.messageModel.create({
        sender: userId,
        content,
        chat: chatId,
      });

      const message = await this.messageModel
        .findById(newMessage.id)
        .populate('sender', 'name pic')
        .populate('chat');

      const userMessage = await this.userModel.populate(message, {
        path: 'chat.users',
        select: 'name pic email',
      });

      await this.chatModel.findByIdAndUpdate(chatId, {
        latestMessage: userMessage,
      });
      return message;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findAll(chatId: string) {
    const messages = await this.messageModel
      .find({
        chat: chatId,
      })
      .populate('sender', 'name pic email')
      .populate('chat');

    return messages;
  }

  join(name: string, client: string) {
    //  Get user name
  }

  getClientName(client: string) {
    // Helper function: Get client name
  }
}
