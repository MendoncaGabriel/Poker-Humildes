import { EventEmitter } from 'events';
import { PlayerConnectUseCase } from '../usecase/player_connect_usacase';
import { PlayerDisconnectedUsecase } from '../usecase/player_disconnected_usecase';
import { StartGameUseCase } from '../usecase/start_game_usecase';
import { ShowPlayerInTableUseCase } from '../usecase/show_player_in_table_usecase';

export const eventEmitter = new EventEmitter();

const playerConnectUseCase = new PlayerConnectUseCase()
const playerDisconnectedUsecase = new PlayerDisconnectedUsecase()
const startGameUseCase = new StartGameUseCase()
const showPlayerInTableUseCase = new ShowPlayerInTableUseCase()

