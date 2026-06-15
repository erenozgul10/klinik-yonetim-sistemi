import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    isim: '',
    email: '',
    sifre: '',
    rol: 'Hasta',
    bolum: '' // Yeni eklenen bölüm state'i
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.mesaj || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="m-0">Sisteme Kayıt Ol</h4>
            </div>
            <div className="card-body">
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
                    <option value="Admin">Yönetici (Admin)</option>
                  </select>
                </div>

                {/* DOKTOR SEÇİLİRSE AÇILAN ZORUNLU BÖLÜM ALANI */}
                {formData.rol === 'Doktor' && (
                  <div className="mb-4 p-3 bg-light rounded border">
                    <label className="form-label fw-bold text-danger">Uzmanlık Bölümü (Zorunlu)</label>
                    <select name="bolum" className="form-select" onChange={handleChange} required>
                      <option value="">Bölüm Seçiniz</option>
                      <option value="KBB">KBB</option>
                      <option value="İç Hastalıkları">İç Hastalıkları</option>
                      <option value="Genel Cerrahi">Genel Cerrahi</option>
                      <option value="Nöroloji">Nöroloji</option>
                      <option value="Kardiyoloji">Kardiyoloji</option>
                      <option value="Üroloji">Üroloji</option>
                      <option value="Ortopedi">Ortopedi</option>
                      <option value="Çocuk Hastalıkları">Çocuk Hastalıkları</option>
                    </select>
                  </div>
                )}

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