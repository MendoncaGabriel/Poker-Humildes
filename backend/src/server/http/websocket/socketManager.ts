import { Server as SocketIOServer, Socket } from 'socket.io';

export class SocketManager {
  constructor(private io: SocketIOServer) {}

  public handleConnection(socket: Socket): void {
    socket.on('disconnect', () => this.sendToAll({ msg: "remover player" }));
    socket.on('message', (message: any) => {
      try {
        const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
        this.sendToAll(parsedMessage);
      } catch (error) {
        console.error('🔴 Erro ao processar a mensagem recebida:', error);
      }
    });
  }

  public sendToAll(message: any): void {
    this.io.emit('message', message);
  }

  public sendToClient(socket: Socket, message: any): void {
    socket.emit('message', message);
  }
}
