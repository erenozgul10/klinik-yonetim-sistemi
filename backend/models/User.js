const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  isim: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  sifre: { 
    type: String, 
    required: true 
  },
  rol: { 
    type: String,
    enum: ['Admin', 'Doktor', 'Hasta'], 
    default: 'Hasta' 
  },
  bolum: { 
    type: String,
    default: '' // Hastalar veya Adminler için boş kalacak
  }
}, { timestamps: true });

// Güvenlik: Şifreyi veritabanına kaydetmeden önce bcrypt ile hashleyelim
userSchema.pre('save', async function (next) {
  if (!this.isModified('sifre')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.sifre = await bcrypt.hash(this.sifre, salt);
});

module.exports = mongoose.model('User', userSchema);