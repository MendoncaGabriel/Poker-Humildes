export function handleEvent(event: string): void {
    switch (event) {
        case "start game":
            console.log("Iniciando uma partida...");
            console.log("Verificando jogadores sentados à mesa...");
            console.log("Travando a mesa para entrada de novos jogadores...");
            break;

        case "init bet":
            console.log("Iniciando rodada de apostas iniciais...");
            break;

        case "distribute cards":
            console.log("Distribuindo cartas da mesa (flop, turn, river)...");
            console.log("Distribuindo cartas para os jogadores sentados à mesa...");
            break;

        default:
            console.log("Evento não reconhecido.");
            break;
    }
}
