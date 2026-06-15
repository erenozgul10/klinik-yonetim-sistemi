const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  hasta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  doktor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tarih: { 
    type: Date, 
    required: true 
  },
  notlar: { 
    type: String 
  },
  durum: { 
    type: String, 
    enum: ['Bekliyor', 'Onaylandı', 'İptal'], 
    default: 'Bekliyor' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);