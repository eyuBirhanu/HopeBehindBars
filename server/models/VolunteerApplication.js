const mongoose = require('mongoose');

const VolunteerApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  interest: { type: String, required: true },
  skillSet: { type: String }, 
  otherInterestDetail: { type: String }, 
  motivation: { type: String, required: true },
  availability: { type: String, required: true },
  linkedin: { type: String },
  twitter: { type: String }, 
  additionalComments: { type: String },

  status: { type: String, default: 'Pending' },
}, { timestamps: true }); 

module.exports = mongoose.model('VolunteerApplication', VolunteerApplicationSchema);