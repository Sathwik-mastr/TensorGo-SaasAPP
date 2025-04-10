import express from 'express';
import User from '../models/User.js';
import { register, loginUser } from '../controllers/Register.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });


router.get('/all', async (req, res) => {
    const { role } = req.query;
  
    try {
      let users;
  
      if (role) {
        users = await User.find({ role });
      } else {
        users = await User.find();
      }
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted successfully");
  });
  
  


router.get('/:UserId', async (req, res) => {
    try {
      const user = await User.findById(req.params.UserId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/register', register);
router.post('/login', loginUser);

router.delete('/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });

router.put('/delete-order/:id', async (req, res) => {
    const userId = req.params.id;
    const { index } = req.body;

    console.log(index)
  
    try {
      const user = await User.findById(userId);
      if (!user || !Array.isArray(user.orders)) {
        return res.status(404).json({ message: 'User or orders not found' });
      }
  
      user.orders.splice(index, 1); // remove order by index
      await user.save();
      console.log(2);
  
      res.status(200).json({ message: 'Order deleted', orders: user.orders });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

router.put('/update-plan/:id', async (req, res) => {
    const { plan, order,date } = req.body;
  
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: { 
                plan, 
                date // Make sure `date` is defined above or use `new Date()`
              },
              $push: { orders: order }
            },
            { new: true }
          );
          
  
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update plan and add order' });
    }
  });
  
export default router;
