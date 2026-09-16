import express from 'express';
import verifyAuth from '../middleware/verifyAuth.js';
import attachOutlet from '../middleware/attachOutlet.js';
import { getDailySummary } from '../controllers/reportController.js';
import { getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/daily', verifyAuth, attachOutlet, getDailySummary);
router.get('/', verifyAuth, attachOutlet, getOrders);

export default router;