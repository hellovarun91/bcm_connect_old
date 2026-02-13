import React from 'react';
import AppRouter from './AppRouter';
import { GlowEffectProvider } from './context/GlowEffectContext';

/**
 * Main App component - Entry point with routing
 */
function App() {
  return (
    <GlowEffectProvider>
      <AppRouter />
    </GlowEffectProvider>
  );
}

export default App;
