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
        const table = this.getTableByRoomId('sala-1'); // Exemplo: usando o ID da sala
        if (table.state === "waitingForPlayers" && table.chairs.length >= 2) {
            let delayToStart = 3000;
            console.log(">>> 🎲 gameplay: começado jogo em 3s...");
            setTimeout(() => {
                table.lookTabe(); // Corrigido aqui
                table.setState('running');
                console.log(">>> 🎲 gameplay: jogo iniciado.");
                this.handleStartPlay({ table });
            }, delayToStart);
        }
    }
    

    private handleStartPlay({ table }: { table: Table }) {
        if (table.chairs.length == 2) {
            table.dealer.shuffleCards();
    
            console.log(`>>> 🎲 gameplay: ${table.chairs.length} jogadores estão na mesa.`);
            const smallBlind = table.minBet;
            const bigBlind = smallBlind * 2;
    
            const playerSmallBlind = table.chairs[0]; // Não crie uma nova instância, use a já existente
            const playerBigBlind = table.chairs[1];
    
            playerSmallBlind.setBetPot(smallBlind);
            playerBigBlind.setBetPot(bigBlind);
            table.dealer.sortCardsFlop();
            table.dealer.sortCardTurn();
            table.dealer.sortCardRiver();
            table.dealer.distributeCardsToPlayers();
        }
    }
    
    private sitPlayer(data: any): void {
        // console.log('Data recebida:', data); // Log para depuração
    
        // Verifique se o objeto data possui as propriedades necessárias
        if (!data || !data.player || !data.room) {
            console.error('Dados inválidos:', data);
            return this.socketManager.sendToAll({ msg: 'Dados inválidos' });
        }
    
        const { player, room } = data;
        
        // Obtenha a mesa a partir do ID da sala
        const table = this.getTableByRoomId(room.id);
    
        // Crie uma nova instância de Player
        const newPlayer = new Player({
            id: player.id,
            name: player.name
        });
    
        // Atualize o estado do jogador
        newPlayer.state = { sitting: true };
        playerConnections.set(this.socket, player.id);
    
        try {
            // Tente sentar o jogador na mesa
            table.sitPlayer(newPlayer);
    
            // Envie uma mensagem atualizada para todos os clientes
            const updateMessage = {
                msg: "exibir players da mesa",
                chairs: table.chairs
            };
            this.socketManager.sendToAll(updateMessage);
        } catch (error) {
            // Trate erros e envie uma mensagem de erro
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