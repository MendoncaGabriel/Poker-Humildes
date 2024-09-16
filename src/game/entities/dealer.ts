import { Cheap } from "./cheap";
import { PlayerManager } from "./PlayerManager";
import { CommunityCardsManager } from "./CommunityCardsManager";

export class Dealer {
    private cheap: Cheap;

    constructor() {
        this.cheap = new Cheap();
    }

    // Distribui cartas para os jogadores
    dealToPlayers(playerManager: PlayerManager): void {
        playerManager.getPlayers().forEach(player => {
            const card1 = this.cheap.dealCard();
            const card2 = this.cheap.dealCard();
            if (card1 && card2) {
                player.receiveCards([card1, card2]);
            }
        });
    }

    // Distribui as cartas comunitárias (Flop, Turn e River)
    dealCommunityCards(communityCardsManager: CommunityCardsManager): void {
        const flopCards = [this.cheap.dealCard(), this.cheap.dealCard(), this.cheap.dealCard()];
        if (flopCards.every(card => card)) {
            communityCardsManager.setFlop({ card1: flopCards[0]!, card2: flopCards[1]!, card3: flopCards[2]! });
        }

        this.dealTurnCard(communityCardsManager);  // Lida com a carta Turn

        this.dealRiverCard(communityCardsManager);  // Lida com a carta River
    }

    // Distribui a carta Turn
    dealTurnCard(communityCardsManager: CommunityCardsManager): void {
        const turnCard = this.cheap.dealCard();
        if (turnCard) {
            communityCardsManager.setTurn({ card: turnCard });
        }
    }

    // Distribui a carta River
    dealRiverCard(communityCardsManager: CommunityCardsManager): void {
        const riverCard = this.cheap.dealCard();
        if (riverCard) {
            communityCardsManager.setRiver({ card: riverCard });
        }
    }

    // Reinicializa o baralho
    resetDeck(): void {
        this.cheap = new Cheap();
    }
}
