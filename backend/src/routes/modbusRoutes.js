import { Router } from 'express';
import ModbusController from '../controllers/ModbusController.js';

const router = Router();

router.get('/data', ModbusController.getData);
router.post('/write', ModbusController.writeData);

export default router;