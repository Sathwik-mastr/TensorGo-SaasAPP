import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: String,
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Organization', organizationSchema);
