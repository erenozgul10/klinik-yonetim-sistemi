import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      {/* Geçici Basit Navigasyon Çubuğu */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Klinik Yönetim Sistemi</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/login">Giriş Yap</Link>
            <Link className="nav-link" to="/register">Kayıt Ol</Link>
          </div>
        </div>
      </nav>

      {/* Sayfa Yönlendirmeleri */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h2 className="text-center mt-5">Ana Sayfaya Hoş Geldiniz! Lütfen Giriş Yapın.</h2>} />
      </Routes>
    </Router>
  );
}

export default App;