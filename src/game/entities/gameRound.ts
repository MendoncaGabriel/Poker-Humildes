import { Dealer } from "./dealer";
import { PlayerManager } from "./PlayerManager";
import { CommunityCardsManager } from "./CommunityCardsManager";
import { Player } from "./player";

export class GameRound {
    private dealer: Dealer;
    private currentBet: number = 0;
    private pot: number = 0;
    private activePlayers: Player[];

    constructor(
        private playerManager: PlayerManager,
        private communityCardsManager: CommunityCardsManager
    ) {
        this.dealer = new Dealer();
        this.activePlayers = [...playerManager.getPlayers()];  // Todos os jogadores estão ativos no início
    }

    start(): void {
        console.log("Rodada iniciada!");

        // Distribui as cartas para os jogadores
        this.dealer.dealToPlayers(this.playerManager);

        // Realiza a rodada de apostas pré-flop
        this.bettingRound("Pré-flop");

        // Distribui as cartas do flop
        this.dealer.dealCommunityCards(this.communityCardsManager);

        // Rodada de apostas após o flop
        this.bettingRound("Flop");

        // Distribui a carta do turn
        this.dealer.dealTurnCard(this.communityCardsManager);

        // Rodada de apostas após o turn
        this.bettingRound("Turn");

        // Distribui a carta do river
        this.dealer.dealRiverCard(this.communityCardsManager);

        // Rodada de apostas final (river)
        this.bettingRound("River");

        this.endRound();
    }

    // Função principal para lidar com a rodada de apostas
    private bettingRound(phase: string): void {
        console.log(`Iniciando rodada de apostas: ${phase}`);

        let playersReady: Player[] = [...this.activePlayers];  // Jogadores que ainda estão no jogo

        let highestBet = 0;
        let playerIndex = 0;

        while (playersReady.length > 1 && playerIndex < playersReady.length) {
            const player = playersReady[playerIndex];

            const action = this.getPlayerAction(player, highestBet);

            if (action === "fold") {
                console.log(`${player.getName()} desiste.`);
                playersReady.splice(playerIndex, 1);  // Remove jogador que desistiu
            } else if (action === "call") {
                console.log(`${player.getName()} iguala a aposta.`);
                this.pot += highestBet;
                playerIndex++;  // Próximo jogador
            } else if (action === "raise") {
                const raiseAmount = player.raiseBet(highestBet);
                highestBet += raiseAmount;
                this.pot += highestBet;
                console.log(`${player.getName()} aumenta a aposta em ${raiseAmount}.`);
                playerIndex++;  // Próximo jogador
            }
        }

        console.log(`Rodada de apostas ${phase} finalizada. Pot: ${this.pot}`);
    }

    // Simula a ação de um jogador
    private getPlayerAction(player: Player, highestBet: number): string {
        // Simular as escolhas do jogador para fins de exemplo
        // Aqui você pode adicionar lógica mais complexa baseada na IA ou nas escolhas do jogador real
        const actions = ["call", "raise", "fold"];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        if (randomAction === "raise") {
            const raiseAmount = Math.floor(Math.random() * 50) + 10; 
            player.placeBet(highestBet + raiseAmount);  
            return "raise";
        } else if (randomAction === "call") {
            player.placeBet(highestBet);  
            return "call";
        } else {
            return "fold"; 
        }
    }

    // Finaliza a rodada e exibe o vencedor (a lógica real dependeria das cartas)
    endRound(): void {
        console.log("Rodada finalizada!");
        console.log(`O pote total foi de: ${this.pot}`);
        // Aqui, você pode determinar o vencedor da rodada e distribuir o pote
    }
}
