import { Card } from "./cheap";

interface PlayerConfig {
    name: string;
    playerId: number;
}

export class Player {
    private hand: Card[] = [];
    private bet: number = 0;
    private balance: number = 0;

    constructor(config: PlayerConfig) {
        this.name = config.name;
        this.playerId = config.playerId;
    }

    // Propriedade para o nome do jogador
    public name: string;
    
    // Propriedade para o ID do jogador
    private readonly playerId: number;

    // Retorna o ID do jogador
    getId(): number {
        return this.playerId;
    }

    // Adiciona cartas à mão do jogador
    addCardsToHand({ card1, card2 }: { card1: Card, card2: Card }): void {
        this.hand = [card1, card2];
    }

    // Adiciona saldo ao jogador
    addBalance(value: number): void {
        if (value < 0) {
            console.log("O valor a ser adicionado deve ser positivo.");
            return;
        }
        this.balance += value;
    }

    // Limpa a mão do jogador
    clearHand(): void {
        this.hand = [];
    }

    // Define a aposta do jogador
    setBet(value: number): void {
        if (value > this.balance) {
            console.log("Saldo insuficiente.");
            return;
        }
        this.balance -= value;
        this.bet = value;
    }

    // Retorna a mão do jogador
    getHand(): Card[] {
        return this.hand;
    }

    // Retorna o saldo do jogador
    getBalance(): number {
        return this.balance;
    }

    // Retorna a aposta do jogador
    getBet(): number {
        return this.bet;
    }
}
