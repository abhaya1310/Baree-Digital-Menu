import { Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './screens/MenuPage';

function App() {
  return (
    <Routes>
      <Route path="/menu/:qrSlug" element={<MenuPage />} />
      {/* Redirect root to a placeholder — in production the QR code provides the slug */}
      <Route path="*" element={<Navigate to="/menu/demo" replace />} />
    </Routes>
  );
}

export default App;
