import { Socket } from 'socket.io';
import { SocketManager } from '../server/http/websocket/socketManager';
import { game, Room } from './game';
import { Table } from './entities/table';
import { Player } from './entities/player';

export const playerConnections = new Map<Socket, string>();

export class GameplayManager {
    constructor(
        private readonly socketManager: SocketManager,
        private readonly socket: Socket
    ) { }

    public execute(message: any): void {
        // console.log('Mensagem recebida:', message); // Log para depuração
    
        switch (message.msg) {
            case 'sentar player na mesa':
                if (!message.data) {
                    console.error('Dados ausentes no message.data');
                    return this.socketManager.sendToAll({ msg: 'Dados ausentes' });
                }
                this.sitPlayer(message.data);
                this.checkStart();
                break;
    
            case 'remover player':
                this.removePlayer();
                break;
    
            case 'verificar players na mesa':
                this.hasActivePlayersInTable({ table: this.getTableByRoomId(message.data.room.id) });
                break;
    
            default:
                console.log('Mensagem desconhecida:', message.msg);
                break;
        }
    }
    
    private getTableByRoomId(roomId: string): Table {
        const room = game.getRoomById(roomId);
        if (!room) throw new Error(`Sala com ID ${roomId} não encontrada.`);
        return room.table;
    }

    private hasActivePlayersInTable({ table }: { table: Table }) {
        this.execute({ msg: "remover player" });

        if (table.chairs.length == 0) {
            console.log(">>> 🎲 gameplay: mesa vazia.");
        }
    }

    private checkStart() {
        const table = this.getTableByRoomId('sala-1'); 
        if (table.state === "waitingForPlayers" && table.chairs.length >= 2) {
            let delayToStart = 3000;
            console.log(">>> 🎲 gameplay: começado jogo em 3s...");
            setTimeout(() => {
                table.lookTabe();  
                table.setState('running');
                console.log(">>> 🎲 gameplay: jogo iniciado.");
                this.handleStartPlay({ table });
            }, delayToStart);
        }
    }
    
private handleStartPlay({ table }: { table: Table }) {
    console.log(`>>> 🎲 gameplay: ${table.chairs.length} jogadores estão na mesa.`);

    if (table.chairs.length >= 2) {
        table.dealer.shuffleCards();
        table.assignBlinds();  // Define os blinds dinamicamente

        table.dealer.sortCardstable();
        table.dealer.distributeCardsToPlayers();

        table.selectTurnPlayer();  // Seleciona quem vai começar a rodada

        this.socketManager.sendToAll("show flop");
    } else if (table.chairs.length > 2) {
        table.dealer.shuffleCards();

        table.assignBlinds();  // Aqui, os blinds são rotativos para qualquer número de jogadores

        table.dealer.sortCardstable();
        table.dealer.distributeCardsToPlayers();

        // Agora, o jogador à esquerda do Big Blind tem a vez de jogar
        const bigBlindIndex = table.chairs.findIndex(player => player.state.isBigBlind == true);
        const nextPlayerIndex = (bigBlindIndex + 1) % table.chairs.length;

        table.chairs.forEach((player, index) => {
            player.setState({ myTurn: index === nextPlayerIndex });
        });

        this.socketManager.sendToAll("show flop");
    }
}

    
    private sitPlayer(data: any): void {
        // console.log('Data recebida:', data); // Log para depuração
    
        if (!data || !data.player || !data.room) {
            console.error('Dados inválidos:', data);
            return this.socketManager.sendToAll({ msg: 'Dados inválidos' });
        }
    
        const { player, room } = data;
        
        const table = this.getTableByRoomId(room.id);
    
        const newPlayer = new Player({
            id: player.id,
            name: player.name
        });
    
        newPlayer.state = { sitting: true };
        playerConnections.set(this.socket, player.id);
    
        try {
            table.sitPlayer(newPlayer);
    
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
        let room;
    
        if (playerId) {
            room = game.rooms.find(r => r.table.chairs.some(chair => chair.id === playerId));
            if (room) {
                room.table.kickPlayer(playerId);
                playerConnections.delete(this.socket);
            }
        }
    
        const updateMessage = {
            msg: "exibir players da mesa",
            chairs: room?.table.chairs || []
        };
    
        this.socketManager.sendToAll(updateMessage);
    }
    
}