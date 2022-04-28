import { IsNotEmpty } from 'class-validator';

export class CreateGroupChatDto {
  @IsNotEmpty()
  chatName: string;

  @IsNotEmpty()
  userIds: string[];
}
