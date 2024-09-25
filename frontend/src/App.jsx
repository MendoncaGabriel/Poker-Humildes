import useSocket from './hooks/useSocket';
import './index.css';
import ActionsPlayer from './components/ActionsPlayer';
import Table from './components/Table';
import Asidebar from './components/Asidebar';
import PlayerCard from './components/PlayerCard';
import { useContext } from 'react';
import { GlobalContext } from './providers/GlobalProvider';

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { connect, disconnect } = useSocket(apiUrl);
  const { global } = useContext(GlobalContext);



  const handleButtonClick = () => {
    if (global.isConnected) {
      disconnect();
    } else {
      connect();
    }
  };


  return (
    <div className="bg-gray-900  flex  items-center justify-center py-2 h-screen  space-x-5">
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-gray-300 w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Humildes Poker</h1>
        <Table />
        <ActionsPlayer />
      </div>

      <div className='flex flex-col space-y-5'>
        <PlayerCard />

        <Asidebar
          handleButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default App;
