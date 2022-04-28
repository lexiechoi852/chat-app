import { IsNotEmpty } from 'class-validator';

export class CreateSingleChatDto {
  @IsNotEmpty()
  chatName: string;

  @IsNotEmpty()
  userId: string;
}
