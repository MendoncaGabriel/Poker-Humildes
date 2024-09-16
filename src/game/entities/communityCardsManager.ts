import { Card } from "./cheap";

export class CommunityCardsManager {
    public Flop: Card[] = [];
    public Turn: Card[] = [];
    public River: Card[] = [];

    setFlop({ card1, card2, card3 }: { card1: Card, card2: Card, card3: Card }): void {
        this.Flop = [card1, card2, card3];
    }

    setTurn({ card }: { card: Card }): void {
        this.Turn = [card];
    }

    setRiver({ card }: { card: Card }): void {
        this.River = [card];
    }
}
