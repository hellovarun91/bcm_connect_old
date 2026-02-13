const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const dgram = require('dgram');
const osc = require('osc-min');

// Create Express app
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins in development
    methods: ['GET', 'POST']
  }
});

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Track connected devices
const connectedDevices = {
  screen: null,
  largeScreen: null
};

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle device registration
  socket.on('register', (deviceType) => {
    if (deviceType === 'screen' || deviceType === 'largeScreen') {
      connectedDevices[deviceType] = socket.id;
      console.log(`Device registered as ${deviceType}: ${socket.id}`);

      // Notify all clients about connected devices
      io.emit('deviceStatus', connectedDevices);
    }
  });

  // Handle navigation events
  socket.on('navigate', (data) => {
    console.log(`Navigation event received: ${JSON.stringify(data)}`);

    // Forward the navigation event to the target device
    if (data.target === 'largeScreen' && connectedDevices.largeScreen) {
      io.to(connectedDevices.largeScreen).emit('navigate', data);
    } else if (data.target === 'screen' && connectedDevices.screen) {
      io.to(connectedDevices.screen).emit('navigate', data);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Remove disconnected device from tracking
    if (connectedDevices.screen === socket.id) {
      connectedDevices.screen = null;
    } else if (connectedDevices.largeScreen === socket.id) {
      connectedDevices.largeScreen = null;
    }

    // Notify remaining clients
    io.emit('deviceStatus', connectedDevices);
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// ────────────────────────────────────────────
// TUIO Object Recognition (InteractiveScape)
// Listens for TUIO/OSC messages on UDP port 3333
// ────────────────────────────────────────────
const TUIO_PORT = 3333;
const tuioObjects = new Map(); // sessionId → { symbolId, x, y, angle }

const udpSocket = dgram.createSocket('udp4');

udpSocket.on('message', (msg) => {
  try {
    const oscData = osc.fromBuffer(msg);

    // Handle OSC bundles (TUIO sends bundles)
    if (oscData.oscType === 'bundle') {
      oscData.elements.forEach((element) => handleTuioMessage(element));
    } else {
      handleTuioMessage(oscData);
    }
  } catch (err) {
    // Silently ignore non-OSC packets
  }
});

function handleTuioMessage(msg) {
  if (!msg.address || !msg.args) return;

  // TUIO 1.0: /tuio/2Dobj
  if (msg.address === '/tuio/2Dobj') {
    const command = msg.args[0]?.value;

    if (command === 'set') {
      const sessionId = msg.args[1]?.value;
      const symbolId = msg.args[2]?.value;
      const x = msg.args[3]?.value;
      const y = msg.args[4]?.value;
      const angle = msg.args[5]?.value;

      const isNew = !tuioObjects.has(sessionId);
      tuioObjects.set(sessionId, { symbolId, x, y, angle });

      io.emit('tuio:object', { command: 'set', sessionId, symbolId, x, y, angle, isNew });

      if (isNew) {
        console.log(`[TUIO] Object placed: tag ${symbolId} (session ${sessionId}) at (${x?.toFixed(2)}, ${y?.toFixed(2)})`);
      }
    } else if (command === 'alive') {
      // Alive message lists all active session IDs
      const aliveIds = msg.args.slice(1).map(a => a.value);
      io.emit('tuio:alive', aliveIds);

      // Detect removed objects
      for (const [sid, obj] of tuioObjects) {
        if (!aliveIds.includes(sid)) {
          console.log(`[TUIO] Object removed: tag ${obj.symbolId} (session ${sid})`);
          io.emit('tuio:remove', { sessionId: sid, symbolId: obj.symbolId });
          tuioObjects.delete(sid);
        }
      }
    }
  }

  // TUIO 2.0: /tuio2/tok (InteractiveScape newer firmware)
  if (msg.address === '/tuio2/tok') {
    const sessionId = msg.args[0]?.value;
    const tuId = msg.args[1]?.value;
    const cId = msg.args[2]?.value;
    const x = msg.args[3]?.value;
    const y = msg.args[4]?.value;
    const angle = msg.args[5]?.value;
    const symbolId = cId || tuId;

    const isNew = !tuioObjects.has(sessionId);
    tuioObjects.set(sessionId, { symbolId, x, y, angle });

    io.emit('tuio:object', { command: 'set', sessionId, symbolId, x, y, angle, isNew });

    if (isNew) {
      console.log(`[TUIO 2.0] Object placed: tag ${symbolId} (session ${sessionId})`);
    }
  }
}

udpSocket.on('error', (err) => {
  console.error(`[TUIO] UDP error: ${err.message}`);
});

udpSocket.bind(TUIO_PORT, () => {
  console.log(`[TUIO] Listening for TUIO messages on UDP port ${TUIO_PORT}`);
});
