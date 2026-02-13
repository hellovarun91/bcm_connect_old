# EY DISPLAX - Multi-Device Connected Commerce Experience

This project provides a connected commerce experience across multiple devices. It uses WebSockets for real-time communication between devices.

## Multi-Device Setup

This application supports two device types:
1. **Screen** - The main interactive device (mobile/tablet)
2. **LargeScreen** - A secondary display device (TV/monitor)

## Running the Application

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the WebSocket Server and React App

```bash
npm run dev
```

This will start both the WebSocket server (on port 5000) and the React application (on port 3000).

### 3. Access the Application on Different Devices

#### For the Screen Device:
- Open `http://<your-ip-address>:3000` in a browser
- The app will automatically register as a 'screen' device

#### For the Large Screen Device:
- Open `http://<your-ip-address>:3000/largePages/page1` in a browser
- The app will automatically register as a 'largeScreen' device

## Communication Flow

1. When you click "Let's begin" on the Screen, the LargeScreen will navigate to page 2
2. When you grant consent on the Screen, the LargeScreen will navigate to page 3
3. When the Canvas loads on the Screen, the LargeScreen will navigate to page 4

## Available Scripts

### `npm run dev`
Runs both the WebSocket server and React app concurrently.

### `npm start`
Runs only the React app in development mode.

### `npm run server`
Runs only the WebSocket server.
