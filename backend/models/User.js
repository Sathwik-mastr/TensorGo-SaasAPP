import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'completed' } // you can also use: pending, failed, etc.
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  plan:{type:String,default:"Basic"},
  role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' },
  orders: [orderSchema],
  date: {
    type: Date,
    default: Date.now  // Automatically sets current date/time when user is created
  },
  
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
});

export default mongoose.model('User', userSchema);
