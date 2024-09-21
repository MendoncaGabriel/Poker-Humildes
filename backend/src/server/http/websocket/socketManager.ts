import { Server as SocketIOServer, Socket } from 'socket.io';
import { eventEmitter } from '../../../game/event_bus/eventEmitter';

export class SocketManager {
  public userSockets: Map<string, string> = new Map(); // userId -> socketId
  public userTables: Map<string, string> = new Map(); // userId -> tableId

  constructor(private io: SocketIOServer) {
    this.init();
  }

  public sendToTable(tableId: string, message: any): void {
    this.io.to(tableId).emit('message', message);
  }

  public sendToUser(userId: string, message: any): void {
    const socketId = this.userSockets.get(userId);
    console.log(`✉️🙎 Enviando mensagem para player, Id: ${userId}, socketId: ${socketId}`);
    if (socketId) {
      this.io.to(socketId).emit('message', message);
    } else {
      console.warn(`Usuário com ID ${userId} não encontrado.`);
    }
  }

  public addUserToTable(socket: Socket, userId: string, tableId: string): void {
    socket.join(tableId);
    this.userSockets.set(userId, socket.id);
    this.userTables.set(userId, tableId);
  }

  public init(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`⏳🙎 Usuário conectado, esperando identificação...`);

      socket.on('message', (event: any) => {
        if (event.msg === "conectar player a mesa") {
          const { player, table } = event;
          const userId = player.id;
          const tableId = table.id;

          this.addUserToTable(socket, userId, tableId);

          eventEmitter.emit(event.msg, {
            player,
            table,
            socket
          });
        }
      });

      socket.on('disconnect', () => {
        const userId = Array.from(this.userSockets.entries()).find(([id, sid]) => sid === socket.id)?.[0];
        if (userId) {
          this.userSockets.delete(userId);
          const tableId = this.userTables.get(userId);
          if (tableId) {
            // Emitir evento de desconexão
            eventEmitter.emit('player desconectou', { socket, userId });
            this.sendToTable(tableId, { msg: `${userId} desconectou` });
          }
          this.userTables.delete(userId);
        }
      });
    });
  }
}
