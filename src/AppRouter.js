import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlaceDevicePage from './pages/PlaceDevicePage';
import ConsentPage from './pages/ConsentPage';
import MenuPage from './pages/MenuPage';


import { SceneObjectProvider } from "./context/SceneObjectContext";




function AppRouter({ deviceType }) {
  return (
    <Router>
      <SceneObjectProvider>
      <Routes>
        {/* Mobile Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/place-device" element={<PlaceDevicePage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/menu" element={<MenuPage />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
        </SceneObjectProvider>
    </Router>
  );
}

export default AppRouter;
