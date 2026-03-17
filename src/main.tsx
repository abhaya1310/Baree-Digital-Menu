import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import PosSelectScreen from './screens/PosSelectScreen.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:outletSlug/:accessPointSlug" element={<App />} />
        <Route path="/:outletSlug" element={<PosSelectScreen />} />
        <Route path="*" element={<Navigate to="/invalid/invalid" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
