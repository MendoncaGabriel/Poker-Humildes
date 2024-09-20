import { EventEmitter } from 'events';
import { Connections } from '../game/events/connections';
import { SitPlayer } from '../game/gameplay/sitPlayerInTable';

const connections = new Connections()
const sitePlayer = new SitPlayer()



class EventCentralizer extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  private init() {
    // Registra os listeners aqui
    this.on("sentar player na mesa", sitePlayer.handle);
    this.on("get connection", connections.get);
    this.on("set connection", connections.set);
  }
}

export const eventEmitter = new EventCentralizer();
