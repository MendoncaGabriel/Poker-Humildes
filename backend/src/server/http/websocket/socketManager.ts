import { Server as SocketIOServer, Socket } from 'socket.io';
import { eventEmitter } from '../../../event_bus/eventEmitter';

export class SocketManager {

  constructor(private io: SocketIOServer) {
    this.init();
  }

  public sendToTable(tableId: string, message: any): void {
    // Envia a mensagem apenas para os sockets na sala correspondente
    this.io.to(tableId).emit('message', message);
  }

  public addToTable(socket: Socket, tableId: string): void {
    // Adiciona o socket à sala específica
    socket.join(tableId);
  }

  public init(): void {
    this.io.on('connection', (socket: Socket) => {
      
      socket.on('message', (event: any) => {
        // Ignora mensagens que vieram do servidor (flag `fromServer`)
        if (event.fromServer) return;

        const { player, table } = event;
        eventEmitter.emit(event.msg, { player, table, socket });
      });

      socket.on('disconnect', () => {
        eventEmitter.emit('player desconectou', { socket });
      });
    });
  }
}
