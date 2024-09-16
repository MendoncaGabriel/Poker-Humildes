import { Card } from "./cheap";

interface PlayerConfig {
    name: string;
    playerId: number;
}

export class Player {
    private hand: Card[] = [];
    private bet: number = 0;
    private balance: number = 0;
    private folded: boolean = false;  // Flag para verificar se o jogador desistiu

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

    getName(): string {
        return this.name
    }

    // Método que permite ao Dealer adicionar cartas à mão do jogador (somente o Dealer chama esse método)
    receiveCards(cards: Card[]): void {
        this.hand = cards;
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
        this.folded = false;  // Reseta a desistência ao limpar a mão
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

    // Método para aumentar a aposta
    raiseBet(amount: number): number {
        if (amount > this.balance) {
            console.log("Saldo insuficiente para aumentar a aposta.");
            return 0;
        }
        this.balance -= amount;
        this.bet += amount;
        console.log(`${this.name} aumentou a aposta em ${amount}.`);
        return amount;  // Retorna o valor de aumento
    }

    // Método para igualar a aposta
    placeBet(value: number): void {
        if (value > this.balance) {
            console.log("Saldo insuficiente para igualar a aposta.");
            return;
        }
        this.balance -= value;
        this.bet = value;  // Atualiza a aposta para o valor igualado
        console.log(`${this.name} igualou a aposta de ${value}.`);
    }

    // Método para desistir
    fold(): void {
        this.folded = true;
        this.clearHand();  // Limpa a mão ao desistir
        console.log(`${this.name} desistiu da rodada.`);
    }

    // Verifica se o jogador desistiu
    hasFolded(): boolean {
        return this.folded;
    }
}
