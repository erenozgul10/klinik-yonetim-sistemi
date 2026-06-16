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
          <ul className="navbar-nav ms-auto align-items-center">
            {token ? (
              <>
                {/* 1. Rol Gösterimi */}
                <li className="nav-item me-3">
                  <span className="badge bg-secondary fs-6">Rol: {rol}</span>
                </li>
                
                {/* 2. YENİ EKLENEN: Profilim Butonu */}
                <li className="nav-item me-4">
                  <Link className="nav-link text-white fw-bold p-0" to="/profil">👤 Profilim</Link>
                </li>
                
                {/* 3. Çıkış Yap Butonu */}
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