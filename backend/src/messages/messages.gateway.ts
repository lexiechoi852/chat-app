import { ChatsService } from './../chats/chats.service';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('MessagesGateway');

  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService,
    // private chatsService: ChatsService,
    private jwtService: JwtService,
  ) {}

  afterInit() {
    this.logger.log('Messages Gateway Initialized');
  }

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Client connected: ${client.id}`);
      this.logger.debug(
        `No. of connected socket ${this.server.engine.clientsCount}`,
      );
      const token = client.handshake.headers.authorization;

      const data = await this.jwtService.verifyAsync(token);

      const user = await this.usersService.findOneById(data.sub);

      if (!user) {
        return this.disconnect(client);
      } else {
        client.data.user = user;
        console.log(user, 'user');

        const rooms = 'Chats from chatsService';
        // this.chatsService.
        return this.server.to(client.id).emit('rooms', rooms);
      }
    } catch (err) {
      return this.disconnect(client);
    }
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
  }

  private disconnect(client: Socket) {
    client.emit('Error', new UnauthorizedException());
    client.disconnect();
  }

  @SubscribeMessage('createMessage')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const message = await this.messagesService.create(
      client.data.user._id,
      createMessageDto,
    );
    // this.server.to(client.id).emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    const messages = this.messagesService.findAll(id);
    return messages;
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.join(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
  }
}
