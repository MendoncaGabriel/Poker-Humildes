import { useEffect, useContext, useState } from 'react';
import { connectSocket, disconnectSocket, sendMessage } from '../utils/socket';
import { GlobalContext } from '../providers/GlobalProvider';

const useSocket = (apiUrl) => {
  const { global, setGlobal } = useContext(GlobalContext);
  const [socket, setSocket] = useState(null)

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
          handCardPlayer: message.cards,
        }));
        break;
      default:
        console.warn('Mensagem desconhecida recebida:', message);
    }
  };


  

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      if (global.principalPlayer.id) {
        const newPlayerId = `${Date.now()}`;

        sendMessage(socket, {
          msg: 'conectar player a mesa',
          player: { id: newPlayerId, name: global.principalPlayer.name },
          table: { id: 'table-1' }
        });
      } else {
        console.warn('Player ID não definido!');
      }
    }, []);

    socket.on("message", (event)=>  handleMessage(event))

  }, [global, socket]);

  const connect = () => {
    if (!socket) {

      const newSocket = connectSocket(apiUrl);
      setSocket(newSocket);

      setGlobal(prev => ({
        ...prev,
        isConnected: true,
        setStatusMessage: "Usuário conectado!"
      }));
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
