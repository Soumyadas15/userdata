const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  email: { type: String, required: false },
  gender: { type: String, required: false },
  income: { type: String, required: false },
  city: { type: String, required: false },
  car: { type: String, required: false },
  quote: { type: String, required: false },
  phone_price: { type: String, required: false },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;