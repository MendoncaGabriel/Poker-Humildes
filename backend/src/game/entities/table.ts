import { socketManager } from "../../server/server";
import { eventEmitter } from "../event_bus/eventEmitter";
import { Card, DeckCard } from "./cards";
import { Player } from "./player";

type StateTable =
    | "waitingForPlayers" // Aguardando jogadores
    | "preflop"           // Rodada de pré-flop
    | "flop"              // Rodada do flop
    | "turn"              // Rodada do turn
    | "river"             // Rodada do river
    | "showdown"          // Fase de revelação das cartas
    | "end"               // Fim da partida
    | "locked";           // Mesa bloqueada para novas entradas

export class Table {
    private state: StateTable
    public id: string
    public minBet: number;
    private minPlayers: number;
    private maxPlayers: number;
    private pot: number;
    public chairs: Player[];
    public flop: Card[];
    public turn: Card;
    public river: Card;
    public dealerPosition: number;
    private readonly deckCard: DeckCard;

    constructor(id: string) {
        this.state = "waitingForPlayers"
        this.id = id
        this.flop = [];
        this.turn = { naipe: "", value: 1 };
        this.river = { naipe: "", value: 1 };
        this.pot = 0;
        this.chairs = [];
        this.minBet = 10;
        this.minPlayers = 2;
        this.maxPlayers = 7;
        this.dealerPosition = 0;
        this.deckCard = new DeckCard()
    }

    setState(state: StateTable) {
        this.state = state
        eventEmitter.emit("changed state table", this)
    }

    getState(): StateTable {
        return this.state
    }

    shuffleCards() {
        console.log(`🏓 Embaralhando cartas da mesa`)
        this.deckCard.shuffle()
    }

    sortCardTable() {
        const [flop1, flop2, flop3, turn, river] = this.deckCard.cards.slice(0, 5);
        this.deckCard.cards.splice(0, 5);

        this.setCardTable({
            flop: [flop1, flop2, flop3],
            turn,
            river
        });

        console.log(`🏓 Distribuindo cartas na mesa`);
    }

    distributeCardsToPlayers() {

        this.chairs.forEach(playerTable => {
            const [card1, card2] = this.deckCard.cards.slice(0, 2); //seleciona
            this.deckCard.cards.splice(0, 2); //remove

            playerTable.setHand({
                fistCard: card1,
                secoundCard: card2
            });

            socketManager.sendToUser(playerTable.id, {msg: "your cards", cards: {
                card1, 
                card2,
                flop1: this.flop[0],
                flop2: this.flop[1],
                flop3: this.flop[2],
            
            },})

        });

        console.log(`🏓 Distribuindo cartas para os players`);
    }

    assignBlinds() {
        console.log(`🏓 Definindo Small blind e Big blind da mesa`);


        const smallBlindIndex = (this.dealerPosition + 1) % this.chairs.length;
        const bigBlindIndex = (this.dealerPosition + 2) % this.chairs.length;

        const smallBlindPlayer = this.chairs[smallBlindIndex];
        const bigBlindPlayer = this.chairs[bigBlindIndex];

        const smallBlindAmount = this.minBet;
        const bigBlindAmount = smallBlindAmount * 2;

        if (smallBlindPlayer) {
            smallBlindPlayer.setBet({ value: smallBlindAmount, description: "small blind" });
        }
        if (bigBlindPlayer) {
            bigBlindPlayer.setBet({ value: bigBlindAmount, description: "big blind" });
        }
    }

    selectTurnPlayer(cb?: (player: Player) => void): void {
        // Se o índice do turno não estiver definido, iniciamos com o big blind + 1
        if (typeof this.dealerPosition === 'undefined') {
            this.dealerPosition = 2; // Definindo a posição inicial como o big blind + 1
        } else {
            // Passa para o próximo jogador
            this.dealerPosition = (this.dealerPosition + 1) % this.chairs.length;
        }
    
        // Reseta a vez de todos os jogadores
        this.chairs.forEach(player => player.setState({ myTurn: false }));
    
        // Define o próximo jogador na vez
        const playerWithTurn = this.chairs[this.dealerPosition];
    
        // Confirma se o jogador ainda está ativo/participando da rodada (por exemplo, não desistiu)
        if (playerWithTurn) {
            playerWithTurn.setState({ myTurn: true });
            console.log(`🏓 Jogador na vez: ${playerWithTurn.name} (ID: ${playerWithTurn.id})`);
            
            // Chama o callback com o jogador, se `cb` estiver definido
            if (cb) cb(playerWithTurn);
        } else {
            // Se o jogador não está ativo, chama recursivamente para passar para o próximo
            this.selectTurnPlayer(cb);
        }
    }

    private setCardTable({ flop, turn, river }: { flop: Card[], turn: Card, river: Card }) {
        this.flop = flop
        this.turn = turn
        this.river = river
    }

    setMinBet(value: number) {
        if (value >= 1) {
            this.minBet = value
        }
    }

    sitPlayer(player: Player) {
        this.chairs.push(player);
        console.log(`🏓 Player sentou na mesa - id: ${player.id}, name: ${player.name}`);
    }

    kickPlayer(playerId: string) {
        this.chairs = this.chairs.filter(e => e.id !== playerId);
        console.log(`🦵🤦‍♂️🏓 Player foi removido da mesa id: ${playerId}`);
    }

}

const tables: Table[] = []

for (let i = 0; i < 3; i++) {
    tables.push(new Table(`table-${i}`))
}

export { tables }
