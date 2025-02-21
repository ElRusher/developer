import express from 'express';
import Order from '../models/order.model.mjs';
import DeliveryPerson from '../models/deliveryPerson.model.mjs';
import User from '../models/user.model.mjs';

const router = express.Router();

// GET total counts
router.get('/totals', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalDeliveryPersons = await DeliveryPerson.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalOrders,
      totalDeliveryPersons,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;