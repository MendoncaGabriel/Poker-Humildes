import useSocket from './hooks/useSocket';
import './index.css';
import ActionsPlayer from './components/ActionsPlayer';
import Table from './components/Table';
import Card from './components/Card';
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

  return (
    <div className="bg-gray-900  flex  items-center justify-center py-2 h-screen ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Humildes Poker</h1>

        <Table
          players={players}
          flop={[
            { value: 10, naipe: "Spades" },
            { value: 9, naipe: "Spades" },
            { value: 8, naipe: "Spades" },
          ]}
          turn={{ value: 7, naipe: "Spades" }}
          river={{ value: 6, naipe: "Spades" }}
          pot={3250} // Exemplo de valor do pote
        />

        <ActionsPlayer turn={turn} />



        {cards.card1 && cards.card2 && (
          <div className="border p-4 flex justify-center space-x-4 bg-gray-700 mt-6 rounded-lg shadow-md">
            <Card value={cards.card1.value} naipe={cards.card1.naipe} />
            <Card value={cards.card2.value} naipe={cards.card2.naipe} />
          </div>
        )}


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
