import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', sifre: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend Login API'sine veri gönderme
      const response = await API.post('/auth/login', formData);
      
      // Gelen token ve rol bilgilerini tarayıcı hafızasına (LocalStorage) kaydetme
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('rol', response.data.rol);
      
      alert('Giriş başarılı!');
      navigate('/'); // Başarılı giriş sonrası ana sayfaya yönlendir
    } catch (error) {
      alert(error.response?.data?.mesaj || 'Giriş başarısız.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sisteme Giriş Yap</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Adresi</label>
                  <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Şifre</label>
                  <input type="password" name="sifre" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Giriş Yap</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;