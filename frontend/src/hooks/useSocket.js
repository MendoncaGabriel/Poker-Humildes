import { useState, useEffect } from 'react';
import { connectSocket, disconnectSocket, sendMessage, setupSocketListeners } from '../utils/socket';

const useSocket = (apiUrl) => {
  const [isConnected, setIsConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Usuário desconectado');
  const [socket, setSocket] = useState(null);
  const [turn, setTurn] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [timer, setTimer] = useState(0);
  
  const [cards, setCards] = useState({});

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      console.log('Mensagem recebida:', message);

      switch (message.msg) {
        case 'exibir players da mesa':
          setPlayers(message.chairs);
          break;
        case 'Mesa cheia':
        case 'Mesa fechada':
          alert(message.msg);
          break;
        case 'Sua vez':
          setTurn(true);
          setStatusMessage('É a sua vez!');
          break;
        case 'o tempo acabou':
          setTurn(false);
          setStatusMessage('O tempo acabou');
          break;
        case 'timer':
          setTimer(message.value);
          break;
        case 'your cards':
          setCards(message.cards);
          break;
        default:
          console.warn('Mensagem desconhecida recebida:', message);
      }
    };

    setupSocketListeners(socket, handleMessage, () => {
      setIsConnected(false);
      setStatusMessage('Usuário desconectado');
      setPlayers([]);
    });

    socket.on('connect', () => {
      setIsConnected(true);
      setStatusMessage('Usuário conectado!');

      if (playerId) {
        sendMessage(socket, {
          msg: 'conectar player a mesa',
          player: { id: playerId, name: 'jhoe due' },
          table: { id: 'table-1' }
        });
      } else {
        console.warn('Player ID não definido!');
      }
    });

    return () => {
      disconnectSocket(socket);
      setIsConnected(false);
      setSocket(null);
    };
  }, [socket, playerId]);

  const connect = () => {
    if (!socket) {
      const newPlayerId = `${Date.now()}`;
      setPlayerId(newPlayerId);
      const newSocket = connectSocket(apiUrl);
      setSocket(newSocket);
    }
  };

  const disconnect = () => {
    if (socket) {
      disconnectSocket(socket);
      setSocket(null);
    }
    setIsConnected(false);
    setStatusMessage('Usuário desconectado');
    setPlayers([]);
  };

  return {
    isConnected,
    players,
    statusMessage,
    connect,
    disconnect,
    turn,
    playerId,
    timer, 
    cards
  };
};

export default useSocket;
