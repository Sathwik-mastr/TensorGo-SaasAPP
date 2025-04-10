import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import planRoutes from './routes/plans.js';
import stripeRoutes from './routes/stripe.js';
import cors from 'cors';






dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/stripe', stripeRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'));
});
