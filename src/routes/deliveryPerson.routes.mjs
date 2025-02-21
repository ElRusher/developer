import { Router } from 'express';
import { getAllDeliveryPersons, createDeliveryPerson, updateDeliveryPerson, deleteDeliveryPerson } from '../controllers/deliveryPerson.controller.mjs';

const router = Router();

router.get('/', getAllDeliveryPersons);
router.post('/', createDeliveryPerson);
router.put('/:id', updateDeliveryPerson);
router.delete('/:id', deleteDeliveryPerson);

export default router;