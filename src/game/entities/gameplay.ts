import { table } from "../game";
import { DealCards } from "../gameplay/dealCards";
import { FirstRoundOfPosts } from "../gameplay/firstRoundOfPosts";
import { StartGame } from "../gameplay/startGame";

type StateGameplay = "start game" | "init bet" | "distribute cards";
const startGame = new StartGame(table)
const firstRoundOfPosts = new FirstRoundOfPosts(table)
const dealCards = new DealCards(table)

export function handleEventGameplay({ event, broadcast }: { event: StateGameplay, broadcast: any }): void {

    switch (event) {
        case "start game":
            startGame.execute(broadcast)
            break;
            
        case "init bet":
            firstRoundOfPosts.execute()
            break;

        case "distribute cards":
            dealCards.execute()
            break;

        default:
            console.log(">>> gameplay: Evento não reconhecido.");
            break;
    }

}
