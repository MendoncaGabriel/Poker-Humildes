import { io } from 'socket.io-client';

// Conecta ao servidor WebSocket
export const connectSocket = (url) => {
  console.log(`Connecting to WebSocket: ${url}`);
  const socket = io(url, {
    transports: ['websocket'], // Força o uso de WebSocket
  });

  socket.on('connect', () => {
    console.log('Successfully connected to WebSocket');
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });

  return socket;
};

// Desconecta do servidor WebSocket
export const disconnectSocket = (socket) => {
  if (socket) {
    socket.disconnect();
    console.log('Disconnected from WebSocket');
  }
};

// Envia uma mensagem para o servidor WebSocket
export const sendMessage = (socket, message) => {
  if (socket && socket.connected) {
    socket.emit('message', message);
    console.log('Message sent to server:', message);
  } else {
    console.error('Socket is not connected. Unable to send message.');
  }
};

// Adiciona ouvintes para mensagens do servidor WebSocket
export const setupSocketListeners = (socket, onMessage, onDisconnect) => {
  if (!socket) return;

  socket.on('message', (message) => {
    console.log('Message received from server:', message);
    onMessage(message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
    onDisconnect();
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });
};
