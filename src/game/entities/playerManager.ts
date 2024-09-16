import { Player } from "./player";

export class PlayerManager {
    private readonly maxPlayers: number = 10;
    private players: Player[] = [];
    private minPlayers: number = 2;

    constructor(private startGameCallback: () => void) {}

    getPlayers(): Player[] {
        return this.players;
    }

    addPlayer(player: Player): void {
        if (this.players.length >= this.maxPlayers) {
            console.log("Esta mesa está cheia.");
            return;
        }

        this.players.push(player);

        // Verifica se há jogadores suficientes para iniciar o jogo
        if (this.players.length >= this.minPlayers) {
            this.startGameCallback();  // Chama o callback para iniciar o jogo
        }
    }

    removePlayer(playerId: number): void {
        const index = this.players.findIndex(player => player.getId() === playerId);
        if (index === -1) {
            console.log("Jogador não encontrado na mesa.");
            return;
        }
        this.players.splice(index, 1);
    }
}
