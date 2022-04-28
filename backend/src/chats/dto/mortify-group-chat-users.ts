import { IsNotEmpty } from 'class-validator';

export class MortifyGroupChatUserstDto {
  @IsNotEmpty()
  userIds: string[];
}
