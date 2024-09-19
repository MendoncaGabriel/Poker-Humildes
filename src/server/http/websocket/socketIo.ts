import { Server as SocketIOServer, Socket } from 'socket.io';

export class SocketManager {
    private io: SocketIOServer;
    private socket: Socket;

    constructor(io: SocketIOServer, socket: Socket) {
        this.io = io;
        this.socket = socket;

        this.socket.on('disconnect', () => {
            this.sendToAll({ msg: "remover player" });
        });

        this.socket.on('message', (message: any) => {
            try {
                const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
                this.sendToAll(parsedMessage);
            } catch (error) {
                console.error('Erro ao processar a mensagem recebida: ', error);
            }
        });
    }

    sendToAll(message: any): void {
        this.io.emit('message', message); 
    }

    sendToClient(message: any): void {
        this.socket.emit('message', message); 
    }
}
