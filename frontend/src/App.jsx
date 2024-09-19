import { useState, useEffect } from 'react';
import { connectSocket, disconnectSocket } from './utils/socket';
import './index.css';
import ActionsPlayer from './components/ActionsPlayer';
import Table from './components/Table';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Usuário desconectado');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Limpar o socket quando o componente desmontar
    return () => {
      if (socket) {
        disconnectSocket();
      }
    };
  }, [socket]);

  const handleButtonClick = () => {
    if (isConnected) {
      // Desconectar o socket
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
      setStatusMessage('Usuário desconectado');
      setPlayers([]);
    } else {
      // Conectar o socket
      const newSocket = connectSocket('http://localhost:3000');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        setIsConnected(true);
        setStatusMessage('Usuário Conectado!');
        sendMessage({
          msg: "sentar player na mesa",
          data: {
            players: {
              id: `id-${Date.now()}`,
              name: "jhoe due"
            }
          },
          tableId: "mesa-1"
        })
      });

      newSocket.on('message', (message) => {
        console.log('Mensagem recebida do servidor:', message); // Log para depuração

        if (message.msg === 'exibir players da mesa') {
          setPlayers(message.chairs);
        }
        if (message.msg === 'Mesa cheia' || message.msg === 'Mesa fechada') {
          alert(message.msg);
        }
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        setStatusMessage('Usuário desconectado');
        setPlayers([]);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Erro na conexão WebSocket: ', error);
        setStatusMessage('Erro na conexão WebSocket. Tente novamente.');
      });
    }
  };

  const sendMessage = ({ msg, data, tableId }) => {
    if (isConnected && socket) {
      const message = {
        msg: msg,
        data: data,
        room: {
          id: tableId
        }
      };

      socket.emit('message', message);
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
          className={`px-6 py-2 ${isConnected ? 'bg-blue-500' : 'bg-orange-500'} text-white font-semibold rounded transition`}
        >
          {isConnected ? 'Sair da mesa' : 'Sentar na mesa 1'}
        </button>

        <p className="mt-4 text-lg text-gray-700">{statusMessage}</p>
      </div>
    </div>
  );
};

export default App;
