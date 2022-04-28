import { MortifyGroupChatUserstDto } from './dto/mortify-group-chat-users';
import { CreateSingleChatDto } from './dto/create-single-chat.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateGroupChatDto } from './dto/create-group-chat.dto';
import { RenameChatDto } from './dto/rename-chat.dto';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('single')
  createSingleChat(@Request() req, @Body() dto: CreateSingleChatDto) {
    return this.chatsService.createSingleChat(req.user.id, dto);
  }

  @Post('group')
  createGroupChat(@Request() req, @Body() dto: CreateGroupChatDto) {
    return this.chatsService.createGroupChat(req.user.id, dto);
  }

  @Get(':id')
  findChatById(@Param('id') id: string) {
    return this.chatsService.findChatById(id);
  }

  @Get()
  findAll(@Request() req) {
    return this.chatsService.findAll(req.user.id);
  }

  @Patch('rename/:id')
  renameChatName(@Param('id') id: string, @Body() dto: RenameChatDto) {
    return this.chatsService.renameChatName(id, dto);
  }

  @Patch('add-user/:id')
  addUserToGroup(
    @Param('id') id: string,
    @Body() dto: MortifyGroupChatUserstDto,
  ) {
    return this.chatsService.addUserToGroup(id, dto);
  }

  @Patch('remove-user/:id')
  removeUserFromGroup(
    @Param('id') id: string,
    @Body() dto: MortifyGroupChatUserstDto,
  ) {
    return this.chatsService.removeUserFromGroup(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
