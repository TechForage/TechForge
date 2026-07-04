import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // ✅ Add this import
import Register from './pages/auth/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/register" />} />
          {/* Add login route later */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;