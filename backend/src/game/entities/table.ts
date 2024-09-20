import { Card } from "./cards";
import { Dealer } from "./dealer";
import { Player } from "./player";

type StateTable = "running" | "waitingForPlayers";


export class Table {
    public minBet: number;
    private minPlayers: number;
    private maxPlayers: number;
    private pot: number;
    private lockedTable: boolean;
    public chairs: Player[] = [];
    public flop: Card[];
    public turn: Card;
    public river: Card;
    public state: StateTable;
    public dealer: Dealer;
    public dealerPosition: number;

    constructor({ minBet, dealer }: { minBet: number; dealer: Dealer }) {
        this.flop = [];
        this.turn = { naipe: "", value: 1 };
        this.river = { naipe: "", value: 1 };
        this.pot = 0;
        this.chairs = [];
        this.minBet = minBet;
        this.minPlayers = 2;
        this.maxPlayers = 7;
        this.lockedTable = false;
        this.state = "waitingForPlayers";
        this.dealer = dealer;
        this.dealerPosition = 0;
    }

    assignBlinds() {
        // Método para definir small blind e big blind dinamicamente
        const smallBlindIndex = (this.dealerPosition + 1) % this.chairs.length;
        const bigBlindIndex = (this.dealerPosition + 2) % this.chairs.length;

        const smallBlindPlayer = this.chairs[smallBlindIndex];
        const bigBlindPlayer = this.chairs[bigBlindIndex];

        const smallBlindAmount = this.minBet;
        const bigBlindAmount = smallBlindAmount * 2;

        smallBlindPlayer.setBetPot(smallBlindAmount);
        bigBlindPlayer.setBetPot(bigBlindAmount);

        console.log(`>>> 🍽️ table: definindo Small blind: ${smallBlindPlayer.name}, Big blind: ${bigBlindPlayer.name}`);
    }

    selectTurnPlayer() {
        // Encontra o índice do jogador que atualmente tem a vez
        const currentTurnIndex = this.chairs.findIndex(player => player.state.myTurn);

        if (currentTurnIndex !== -1) {
            // Se houver um jogador com a vez, define `myTurn` dele como `false` usando setState
            this.chairs[currentTurnIndex].setState({ myTurn: false });

            // Calcula o próximo jogador que vai receber a vez
            const nextTurnIndex = (currentTurnIndex + 1) % this.chairs.length;

            // Passa a vez para o próximo jogador usando setState
            this.chairs[nextTurnIndex].setState({ myTurn: true });
        } else {
            // Se nenhum jogador tem a vez, o primeiro jogador recebe a vez
            this.chairs[0].setState({ myTurn: true });
        }

        console.log(`>>> 🍽️ table: selecionando a vez do jogador na mesa`)
        let playerWithTurn = this.chairs.find(player => player.state.myTurn)
        if(playerWithTurn){
            console.log(`>>> 🍽️  table: jogador name: ${playerWithTurn.name} id: ${playerWithTurn.id} tem a vez`)
            return playerWithTurn
        }
    }

    setCardTable({ flop, turn, river }: { flop: Card[], turn: Card, river: Card }) {
        this.flop = flop
        this.turn = turn
        this.river = river
    }

    setState(state: StateTable) {
        this.state = state
    }

    setMinBet(value: number) {
        if (value >= 1) {
            this.minBet = value
        }
    }

    sitPlayer(player: Player) {
        if (this.lockedTable) {
            throw new Error("Mesa fechada");
        }

        if (this.chairs.some(chair => chair.id === player.id)) {
            throw new Error("Player já está sentado na mesa");
        }

        if (this.chairs.length >= this.maxPlayers) {
            throw new Error("Mesa cheia");
        }

        this.chairs.push(player);
        return { msg: `Player com id ${player.id} sentou na mesa` };
    }

    kickPlayer(playerId: string): { msg: string } {
        const player = this.chairs.find(e => e.id == playerId)
        if (!player) return { msg: `player com id ${playerId}, não esta na mesa` }
        this.chairs = this.chairs.filter(e => e.id !== playerId);
        return { msg: `Player com id ${playerId} foi removido da mesa` };
    }

    lookTabe() {
        this.lockedTable = true
    }

    unLookTabe() {
        this.lockedTable = false
    }
}