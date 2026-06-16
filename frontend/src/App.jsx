import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        {/* Ana İçerik Alanı */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><HomeRouter /></PrivateRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;