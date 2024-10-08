import { Card } from "./cards";

interface Hand {
    fistCard: Card;
    secoundCard: Card;
}

type PlayerAction =
    | 'bet'
    | 'call'
    | 'raise'
    | 'fold'
    | 'check'
    | 'all_in'
    | 're_raise'
    | 'waiting'

interface PlayerStates {
    isBigBlind?: unknown;
    myTurn?: boolean;     // minha vez
    sitting?: boolean;    // sentado
    toGiveUp?: boolean;   // desistiu
    action?: PlayerAction //actions
}

export class Player {
    public id: string;
    public name: string;
    public wallet: number;
    public hand?: Hand;
    public state: PlayerStates;
    public actions: PlayerAction;

    constructor({ id, name, wallet = 100, hand, state = {}, actions = "waiting" }: {
        id: string,
        name: string,
        wallet?: number,
        hand?: Hand,
        state?: PlayerStates,
        actions?: PlayerAction
    }) {
        this.id = id;
        this.name = name;
        this.wallet = wallet;
        this.hand = hand;
        this.state = state;
        this.actions = actions;
    }

    getWallet(): number {
        return this.wallet;
    }

    setWallet(value: number): void {
        this.wallet = value;
    }

    setBet({ value, description = '' }: { value: number, description?: string }): void {
        if (this.wallet >= value) {
            this.wallet -= value
            console.log(`🙋‍♂️💰 player ${description}: ${this.name}-${this.id} apostou: ${value}`)
        } else {
            console.log(`🙋‍♂️💰 player ${description}: ${this.name}-${this.id} saldo insuficiente para aposta, carteira: ${this.wallet}`)
        }
    }

    setHand({ fistCard, secoundCard }: Hand): void {
        this.hand = { fistCard, secoundCard };
    }

    setState(state: PlayerStates): void {
        this.state = { ...this.state, ...state };
    }
}
