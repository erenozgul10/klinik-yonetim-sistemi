import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

// Güvenlik Katmanı
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Rol Yönlendiricisi
const HomeRouter = () => {
  const rol = localStorage.getItem('rol');
  if (rol === 'Admin') return <AdminPanel />;
  return <Dashboard />;
};

function App() {
  return (
    <Router>
      {/* Menü Her Sayfada Sabit */}
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><HomeRouter /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;