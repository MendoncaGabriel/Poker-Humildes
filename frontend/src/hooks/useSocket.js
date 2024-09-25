import { useEffect, useContext, useState } from 'react';
import { connectSocket, disconnectSocket, sendMessage, setupSocketListeners } from '../utils/socket';
import { GlobalContext } from '../providers/GlobalProvider';

const useSocket = (apiUrl) => {
  const { global, setGlobal } = useContext(GlobalContext);

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      console.log('Mensagem recebida:', message);

      switch (message.msg) {
        case 'exibir players da mesa':
          setGlobal(prev => ({
            ...prev,
            chairs: message.chairs
          }))
          break;
        case 'Mesa cheia':
        case 'Mesa fechada':
          alert(message.msg);
          break;
        case 'Sua vez':
          setGlobal(prev => ({
            ...prev,
            turnPlayer: true,
            statusMessage: "É a sua vez!"
          }))
          break;
        case 'o tempo acabou':
          setGlobal(prev => ({
            ...prev,
            turnPlayer: false,
            statusMessage: "O tempo acabou"
          }))
          break;
        case 'timer':
          setGlobal(prev => ({
            ...prev,
            timer: message.value
          }))
          break;
        case 'your cards':
          setGlobal(prev => ({
            ...prev,
            cards: message.value,
          }))
          break;
        default:
          console.warn('Mensagem desconhecida recebida:', message);
      }
    };

    setupSocketListeners(socket, handleMessage, () => {
      setGlobal(prev => ({
        ...prev,
        isConnected: true
      }));

    });

    socket.on('connect', () => {
      setGlobal(prev => ({
        ...prev,
        isConnected: true,
        setStatusMessage: "Usuário conectado!"
      }));

      if (global.principalPlayer.playerId) {
        const newPlayerId = `${Date.now()}`;

        sendMessage(socket, {
          msg: 'conectar player a mesa',
          player: { id: newPlayerId, name: global.principalPlayer.name },
          table: { id: 'table-1' }
        });
      } else {
        console.warn('Player ID não definido!');
      }
    });

    return () => {
      disconnectSocket(socket);
      setSocket(null);
    };
  }, [global.principalPlayer.name, global.principalPlayer.playerId, setGlobal, socket]);

  const connect = () => {
    if (!socket) {
      const newSocket = connectSocket(apiUrl);
      setSocket(newSocket);
    }
  };

  const disconnect = () => {
    if (socket) {
      disconnectSocket(socket);
      setSocket(null);
    }
    setGlobal(prev => ({
      ...prev,
      isConnected: false,
      setStatusMessage: "Usuário desconectado",
      players: []
    })); 
  };

  return {
    connect,
    disconnect,
  };
};

export default useSocket;
