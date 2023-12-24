import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';

import { JwtService } from 'src/auth/jwt/jwt.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { User } from 'src/user/interfaces/user.interface';

@WebSocketGateway(1080, { namespace: 'rooms' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  connectedUsers: string[] = [];

  constructor(
    private readonly roomsService: RoomsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(socket) {
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true,
    );

    this.connectedUsers = [...this.connectedUsers, String(user._id)];

    this.server.emit('users', this.connectedUsers);
  }

  async handleDisconnect(socket) {
    const user: User = await this.jwtService.verify(
      socket.handshake.query.token,
      true,
    );

    const userIndex = this.connectedUsers.indexOf(String(user._id));

    if (userIndex > -1) {
      this.connectedUsers.splice(userIndex, 1);
    }

    this.server.emit('users', this.connectedUsers);
  }

  @SubscribeMessage('message')
  async onMessage(client, data: any) {
    const event = 'message';
    const result = data[0];

    await this.roomsService.addMessage(result.room, result.message);
    client.broadcast.to(result.room).emit(event, result.message);

    return new Observable((observer) =>
      observer.next({
        event,
        data: result.message,
      }),
    );
  }

  @SubscribeMessage('join')
  async onRoomJoin(client, data: any) {
    client.join(data[0]);

    const messages = await this.roomsService.findMessages(data, 25);
    client.emit('messages', messages);
  }

  @SubscribeMessage('leave')
  async onRoomLeave(client, data: any) {
    client.leave(data[0]);
  }
}