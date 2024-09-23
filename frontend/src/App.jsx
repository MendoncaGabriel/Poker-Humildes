import useSocket from './hooks/useSocket';
import './index.css';
import ActionsPlayer from './components/ActionsPlayer';
import Table from './components/Table';
import Card from './components/Card';

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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Humildes Poker</h1>



        <Table players={players} flop={""} turn={""} river={""} />
        {turn && <ActionsPlayer />}

        <br />

        {
          cards.card1 && cards.card2 &&

          <div className='border p-4 flex justify-center space-x-4 bg-gray-50'>
            <Card
              value={cards?.card1?.value}
              naipe={cards?.card1?.naipe}
            /> 
            <Card
              value={cards?.card2?.value}
              naipe={cards?.card2?.naipe}
            /> 
            
          </div>

        }

        <br />

        <button
          onClick={handleButtonClick}
          className={`px-6 py-2 ${isConnected ? 'bg-orange-500' : 'bg-blue-500'} text-white font-semibold rounded transition`}
        >
          {isConnected ? 'Sair da mesa' : 'Sentar na mesa 1'}
        </button>

        <p>playerId: {playerId}</p>
        <p>{timer != 0 && timer}</p>
        <p className="mt-4 text-lg text-gray-700">{statusMessage}</p>
      </div>
    </div>
  );
};

export default App;
