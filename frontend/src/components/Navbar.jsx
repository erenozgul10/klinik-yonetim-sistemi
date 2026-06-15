import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🏥 KlinikSistem</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="badge bg-secondary me-3 fs-6">Rol: {rol}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Çıkış Yap</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Giriş Yap</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary text-white ms-2 px-3" to="/register">Kayıt Ol</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;