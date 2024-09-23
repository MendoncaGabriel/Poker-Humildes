import { eventEmitter } from "../event_bus/eventEmitter";

export class HandleStatePlayerUseCase {
    constructor(){
        eventEmitter.on("changed state player", this.handle.bind(this))
    }

    handle(){

    }
}