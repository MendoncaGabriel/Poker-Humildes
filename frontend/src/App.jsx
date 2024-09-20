import { useState } from 'react';
import useSocket from './hooks/useSocket';
import './index.css';
import ActionsPlayer from './components/ActionsPlayer';
import Table from './components/Table';

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { isConnected, players, statusMessage, connect, disconnect } = useSocket(apiUrl);

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

        <Table players={players} />
        <ActionsPlayer />
        <br />

        <button
          onClick={handleButtonClick}
          className={`px-6 py-2 ${isConnected ? 'bg-orange-500' : 'bg-blue-500'} text-white font-semibold rounded transition`}
        >
          {isConnected ? 'Sair da mesa' : 'Sentar na mesa 1'}
        </button>

        <p className="mt-4 text-lg text-gray-700">{statusMessage}</p>
      </div>
    </div>
  );
};

export default App;
