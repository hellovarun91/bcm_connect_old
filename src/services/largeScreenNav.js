import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true
});

socket.on('connect', () => {
  socket.emit('register', 'screen');
});

export const sendLargeScreenRoute = (route, data = {}) => {
  socket.emit('navigate', {
    target: 'largeScreen',
    route,
    data
  });
};

export default socket;
