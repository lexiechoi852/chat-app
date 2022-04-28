import { IsNotEmpty } from 'class-validator';

export class RenameChatDto {
  @IsNotEmpty()
  chatName: string;
}
