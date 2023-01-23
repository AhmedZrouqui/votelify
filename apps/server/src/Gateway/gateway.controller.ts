import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';

@WebSocketGateway({
  cors: '*',
})
export class GatewayController {
  @SubscribeMessage('init')
  init(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(body);
    return 'received';
  }

  @SubscribeMessage('CONNECT_USER')
  connect(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log('connect function', body);
    client.emit('IS_CONNECTED', {
      data: 'Init message received, this is a response from server, connection established successfully.',
    });
  }
}
