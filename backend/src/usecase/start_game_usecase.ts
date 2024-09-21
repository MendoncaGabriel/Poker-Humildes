import { eventEmitter } from "../event_bus/eventEmitter";

export class StartGameUseCase {
    constructor(){
        eventEmitter.on('iniciar jogo', this.handle.bind(this));
    }
    handle(){
        console.log('Iniciando o jogo...');
    }
}
