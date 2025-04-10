import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  users: Number,
});

export default mongoose.model('Plan', planSchema);
