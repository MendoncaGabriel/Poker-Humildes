enum PokerStage {
    Blinds = "Blinds",
    DealCards = "DealCards",
    Flop = "Flop",
    Turn = "Turn",
    River = "River",
    Showdown = "Showdown"
}

export class PokerGame {
    private stages: PokerStage[] = [
        PokerStage.Blinds,
        PokerStage.DealCards,
        PokerStage.Flop,
        PokerStage.Turn,
        PokerStage.River,
        PokerStage.Showdown
    ];
    
    private currentStageIndex: number = 0;
    private tableLocked: boolean = false; // Indica se a mesa está bloqueada para novos jogadores
    private playersBettingComplete: boolean = false; // Indica se a rodada de apostas foi concluída

    constructor() {
        this.logCurrentStage();
    }

    // Método para avançar para a próxima etapa
    next(): void {
        this.executeCurrentStage(); // Executa as ações correspondentes à etapa atual
        
        // Avança o índice para a próxima etapa, ou reinicia no início se já estiver na última etapa
        this.currentStageIndex = (this.currentStageIndex + 1) % this.stages.length;
        this.logCurrentStage(); // Loga a nova fase
    }

    // Método para obter a etapa atual
    getCurrentStage(): PokerStage {
        return this.stages[this.currentStageIndex];
    }

    // Função para executar as ações específicas de cada fase do jogo
    private executeCurrentStage(): void {
        switch (this.getCurrentStage()) {
            case PokerStage.Blinds:
                this.lockTable();
                this.startBlinds();
                break;
            case PokerStage.DealCards:
                this.dealCardsToPlayers();
                break;
            case PokerStage.Flop:
                this.startBettingRound();
                this.openFlop();
                break;
            case PokerStage.Turn:
                this.startBettingRound();
                this.openTurn();
                break;
            case PokerStage.River:
                this.startBettingRound();
                this.openRiver();
                break;
            case PokerStage.Showdown:
                this.showdown();
                this.resetTableForNextRound();
                break;
        }
    }

    // Loga a etapa atual do jogo
    private logCurrentStage(): void {
        switch (this.getCurrentStage()) {
            case PokerStage.Blinds:
                console.log("Fase atual: Apostas iniciais (Blinds). Mesa bloqueada para novos jogadores.");
                break;
            case PokerStage.DealCards:
                console.log("Fase atual: Distribuição de cartas aos jogadores.");
                break;
            case PokerStage.Flop:
                console.log("Fase atual: Flop - Três cartas comunitárias são reveladas.");
                break;
            case PokerStage.Turn:
                console.log("Fase atual: Turn - A quarta carta comunitária é revelada.");
                break;
            case PokerStage.River:
                console.log("Fase atual: River - A quinta e última carta comunitária é revelada.");
                break;
            case PokerStage.Showdown:
                console.log("Fase atual: Showdown - Revelação das cartas dos jogadores.");
                break;
        }
    }

    // Bloqueia a mesa para novos jogadores
    private lockTable(): void {
        this.tableLocked = true;
        console.log("Mesa bloqueada para novos jogadores nesta rodada.");
    }

    // Inicia a fase de apostas iniciais (Blinds)
    private startBlinds(): void {
        console.log("Iniciando a rodada de apostas iniciais (Blinds).");
        // Lógica para apostas iniciais (Blinds)
    }

    // Distribui cartas para os jogadores
    private dealCardsToPlayers(): void {
        console.log("Distribuindo cartas para os jogadores.");
        // Lógica para distribuir duas cartas a cada jogador
    }

    // Inicia a rodada de apostas
    private startBettingRound(): void {
        console.log("Iniciando rodada de apostas.");
        this.playersBettingComplete = false;
        // Lógica para permitir que os jogadores façam apostas
    }

    // Revela as três primeiras cartas comunitárias (Flop)
    private openFlop(): void {
        console.log("Revelando o Flop - As três primeiras cartas comunitárias.");
        // Lógica para abrir o Flop
    }

    // Revela a quarta carta comunitária (Turn)
    private openTurn(): void {
        console.log("Revelando o Turn - A quarta carta comunitária.");
        // Lógica para abrir o Turn
    }

    // Revela a quinta e última carta comunitária (River)
    private openRiver(): void {
        console.log("Revelando o River - A quinta e última carta comunitária.");
        // Lógica para abrir o River
    }

    // Conduz a fase final, Showdown
    private showdown(): void {
        console.log("Conduzindo o Showdown - Revelação das cartas dos jogadores.");
        // Lógica para revelar as cartas e determinar o vencedor
    }

    // Reseta a mesa para a próxima rodada
    private resetTableForNextRound(): void {
        console.log("Reiniciando a mesa para a próxima rodada.");
        this.tableLocked = false;
        this.playersBettingComplete = false;
        // Reseta o estado da mesa para começar uma nova rodada
    }
}

// // Exemplo de uso
// const pokerGame = new PokerGame();

// // Avançando para as próximas etapas
// pokerGame.next();  // Apostas iniciais (Blinds) e tranca a mesa
// pokerGame.next();  // Distribui cartas aos jogadores
// pokerGame.next();  // Abre o Flop e inicia rodada de apostas
// pokerGame.next();  // Abre o Turn e inicia rodada de apostas
// pokerGame.next();  // Abre o River e inicia rodada de apostas
// pokerGame.next();  // Showdown - Revelação de cartas
// pokerGame.next();  // Reinicia o jogo
