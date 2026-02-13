import { io } from 'socket.io-client';
import { getConfig } from '../config/loadConfig';

const config = getConfig();
const SOCKET_URL = config?.socketUrl || process.env.REACT_APP_SOCKET_URL || 'http://localhost:5002';

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
