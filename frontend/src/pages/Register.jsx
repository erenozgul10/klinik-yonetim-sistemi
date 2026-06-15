import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  // Form verilerini tutacağımız durum (State) yönetimi
  const [formData, setFormData] = useState({
    isim: '',
    email: '',
    sifre: '',
    rol: 'Hasta' // Varsayılan rol
  });
  const navigate = useNavigate();

  // Form elemanlarındaki değişiklikleri yakalama
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form gönderildiğinde (Submit) çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend Register API'sine veri gönderme
      await API.post('/auth/register', formData);
      alert('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/login'); // Kayıt sonrası giriş sayfasına yönlendir
    } catch (error) {
      alert(error.response?.data?.mesaj || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sisteme Kayıt Ol</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">İsim Soyisim</label>
                  <input type="text" name="isim" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Adresi</label>
                  <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Şifre</label>
                  <input type="password" name="sifre" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Hesap Türü</label>
                  <select name="rol" className="form-select" onChange={handleChange}>
                    <option value="Hasta">Hasta</option>
                    <option value="Doktor">Doktor</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Kayıt Ol</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;