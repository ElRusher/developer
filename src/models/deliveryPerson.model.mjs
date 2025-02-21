import mongoose from 'mongoose';

const deliveryPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);

export default DeliveryPerson;