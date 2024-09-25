import useSocket from './hooks/useSocket';
import './index.css';
import ActionsPlayer from './components/ActionsPlayer';
import Table from './components/Table';
import Asidebar from './components/Asidebar';

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { isConnected, players, statusMessage, connect, disconnect, turn, playerId, timer, cards } = useSocket(apiUrl);

  const handleButtonClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  // o player que esta jogando tem que ser removido destalista
  const playersMok = [
    {name: "name player"},
    {name: "name player"},
    {name: "name player"},
    {name: "name player"},
    {name: "name player"},
    {name: "name player"},
    {name: "name player"},
    {name: "name player"},
    {name: "name player"}
   ]

  const cardsMok = {
    flop: [              
      { value: 10, naipe: "Hearts" },
      { value: 9, naipe: "Spades" },
      { value: 8, naipe: "Diamonds" }],
    turn: {value: 7, naipe: "Clubs"},
    river: {value: 6, naipe: "Spades"}
  }

  return (
    <div className="bg-gray-900  flex  items-center justify-center py-2 h-screen  space-x-5">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-gray-300 w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Humildes Poker</h1>

        <Table
          players={playersMok}
          pot={3250}
          cardsTable={cardsMok}
        />

        <ActionsPlayer turn={turn} />

      </div>

      <Asidebar
        handleButtonClick={handleButtonClick}
        isConnected={isConnected}
        playerId={playerId}
        statusMessage={statusMessage}
        timer={timer}
        key={"1"}
      />

    </div>
  );
};

export default App;
