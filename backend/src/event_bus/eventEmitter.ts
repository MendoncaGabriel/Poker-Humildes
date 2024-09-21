import { EventEmitter } from 'events';
import { SitPlayerInTableUseCase } from '../usecase/sit_player_In_table_usecase';
import { socketManager } from '../server/server';
import { PlayerDisconnectedUsecase } from '../usecase/player_disconnected_usecase';
import { Table } from '../game/entities/table';

const sitPlayerInTableUseCase = new SitPlayerInTableUseCase()
const playerDisconnectedUsecase = new PlayerDisconnectedUsecase()

class EventCentralizer extends EventEmitter {
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.on("sentar player na mesa", sitPlayerInTableUseCase.handle);

    this.on("exibir players da mesa", (table: Table): void => {
      const chairs = table.chairs
      socketManager.sendToTable(table.id, { msg: "exibir players da mesa", chairs })
    })
    
    this.on("playerDisconnected", playerDisconnectedUsecase.handle)
  }
}

export const eventEmitter = new EventCentralizer();
