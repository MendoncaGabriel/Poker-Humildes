import { Socket } from 'socket.io';
import { SocketManager } from '../server/http/websocket/socketManager';
import { table } from './game';

export const playerConnections = new Map<Socket, string>();

export class GameplayManager {
    constructor(
        private readonly socketManager: SocketManager,
        private readonly socket: Socket
    ) { }

    public execute(message: any): void {

        switch (message.msg) {
            case 'sentar player na mesa':
                this.sitPlayer(message.data);
                break;
            case 'remover player':
                this.removePlayer();
                break;
            default:
                console.log('Mensagem desconhecida:', message.msg);
                break;
        }
    }

    private sitPlayer(player: any): void {
        player.state = { sitting: true };
        playerConnections.set(this.socket, player.id); //registra player no map

        try {
            table.sitPlayer(player);

            const updateMessage = {
                msg: "exibir players da mesa",
                chairs: table.chairs
            };
            this.socketManager.sendToAll(updateMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido';
            this.socketManager.sendToAll({ msg: errorMessage });
        }
    }

    private removePlayer(): void {
        const playerId = playerConnections.get(this.socket);

        if (playerId) {
            table.kickPlayer(playerId);
            playerConnections.delete(this.socket); //remove player de acordo com o registrado no map
        }

        const updateMessage = {
            msg: "exibir players da mesa",
            chairs: table.chairs
        };

        this.socketManager.sendToAll(updateMessage);
    }
}
