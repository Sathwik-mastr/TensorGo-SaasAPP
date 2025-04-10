import express from 'express';
import Plan from '../models/Plan.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

// Add new plan
router.post('/', async (req, res) => {
  const { name, price, users } = req.body;
  const newPlan = new Plan({ name, price, users });
  await newPlan.save();
  res.status(201).json(newPlan);
});

// Delete a plan
router.delete('/:id', async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted' });
});


export default router;
