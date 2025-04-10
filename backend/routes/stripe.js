import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
// import {authMiddleware} from '../middlewares/authMiddleware.js'
dotenv.config();

 console.log("key",process.env.STRIPE_SECRET)
const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

router.post('/create-checkout-session',async (req, res) => {
  const { planId } = req.body;
  const {user} = req.body;

  console.log(req.body)

  const planPrices = {
    basic: 0,
    standard: 499900,
    plus: 399900,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Upgrade to ${planId} plan`,
          },
          unit_amount: planPrices[planId],
        },
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/dashboard/success/${planId}`,
    cancel_url: 'http://localhost:3000/dashboard/fail',
  });

  res.json({ url: session.url });
});

export default router;
