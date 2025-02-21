import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;