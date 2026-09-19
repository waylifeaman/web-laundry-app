import express from 'express';
import verifyAuth from '../middleware/verifyAuth.js';
import attachOutlet from '../middleware/attachOutlet.js';
import { getDailySummary } from '../controllers/reportController.js';
import { getOrders } from '../controllers/orderController.js';
import { getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.get('/daily', verifyAuth, attachOutlet, getDailySummary);
router.get('/', verifyAuth, attachOutlet, getOrders);
router.get('/:id',verifyAuth, attachOutlet, getOrderById); //untuk detail order

export default router;