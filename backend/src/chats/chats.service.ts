import { MortifyGroupChatUserstDto } from './dto/mortify-group-chat-users';
import { User, UserDocument } from './../users/schemas/user.schema';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupChatDto } from './dto/create-group-chat.dto';
import { RenameChatDto } from './dto/rename-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateSingleChatDto } from './dto/create-single-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createSingleChat(currentUserId: string, dto: CreateSingleChatDto) {
    const { chatName, userId } = dto;

    const chat = await this.findSingleChat(currentUserId, userId);

    if (chat) {
      throw new HttpException('Chat already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const newChat = await this.chatModel.create({
        chatName,
        isGroupChat: false,
        users: [currentUserId, userId],
      });
      const chat = await newChat.populate('users', '-password');
      return chat;
    } catch (err) {
      console.log(err);
    }
  }

  async createGroupChat(currentUserId: string, dto: CreateGroupChatDto) {
    const { chatName, userIds } = dto;
    try {
      const newGroupChat = await this.chatModel.create({
        chatName,
        isGroupChat: true,
        users: userIds,
        groupAdmin: currentUserId,
      });

      const chat = await this.chatModel
        .findById(newGroupChat.id)
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
      return chat;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(userId: string) {
    const chats = await this.chatModel
      .find({ $match: { users: { $elemMatch: { $eq: userId } } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });
    const userChat = await this.userModel.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    });
    return userChat;
  }

  private async findSingleChat(userId: string, id: string) {
    const oneOnOneChat = await this.chatModel
      .find({
        isGroupChat: false,
      })
      .and([
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: id } } },
      ])
      .populate('users', '-password')
      .populate('latestMessage');

    const chat = await this.userModel.populate(oneOnOneChat, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    });

    if (chat && chat.length > 0) {
      return chat;
    }
    return null;
  }

  async findChatById(id: string) {
    try {
      const chat = await this.chatModel
        .findById(id)
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage');
      const userChat = await this.userModel.populate(chat, {
        path: 'latestMessage.sender',
        select: 'name pic email',
      });
      return userChat;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async renameChatName(id: string, dto: RenameChatDto) {
    await this.findChatById(id);

    const { chatName } = dto;
    const updatedChat = await this.chatModel
      .findByIdAndUpdate(id, { $set: { chatName } }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    return updatedChat;
  }

  async addUserToGroup(id: string, dto: MortifyGroupChatUserstDto) {
    const { userIds } = dto;
    const groupChat = await this.chatModel
      .findByIdAndUpdate(
        id,
        {
          $push: { users: { $each: userIds } },
        },
        { new: true },
      )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    return groupChat;
  }

  async removeUserFromGroup(id: string, dto: MortifyGroupChatUserstDto) {
    const { userIds } = dto;
    console.log(id, userIds, 'removeFromGroup params');
    const groupChat = await this.chatModel
      .findByIdAndUpdate(
        id,
        {
          $pull: { users: { $in: userIds } },
        },
        { new: true },
      )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    return groupChat;
  }

  async remove(id: string) {
    const chat = await this.chatModel.findByIdAndDelete(id);
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }
}
