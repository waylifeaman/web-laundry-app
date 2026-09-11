import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth_pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/auth_pages/RegisterPage';
import ForgotPasswordPage from './pages/auth_pages/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Nanti tambah route dashboard di sini */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;