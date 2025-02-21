import DeliveryPerson from '../models/deliveryPerson.model.mjs';

export const getAllDeliveryPersons = async (req, res) => {
  try {
    const deliveryPersons = await DeliveryPerson.find();
    res.status(200).json(deliveryPersons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDeliveryPerson = async (req, res) => {
  const deliveryPerson = new DeliveryPerson(req.body);
  try {
    const savedDeliveryPerson = await deliveryPerson.save();
    res.status(201).json(savedDeliveryPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDeliveryPerson = async (req, res) => {
  try {
    const updatedDeliveryPerson = await DeliveryPerson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDeliveryPerson) {
      return res.status(404).json({ message: 'Delivery person not found' });
    }
    res.status(200).json(updatedDeliveryPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDeliveryPerson = async (req, res) => {
  try {
    const deletedDeliveryPerson = await DeliveryPerson.findByIdAndDelete(req.params.id);
    if (!deletedDeliveryPerson) {
      return res.status(404).json({ message: 'Delivery person not found' });
    }
    res.status(200).json({ message: 'Delivery person deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};