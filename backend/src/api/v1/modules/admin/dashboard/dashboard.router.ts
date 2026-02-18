import express from 'express';
import { protect } from '../../../middlewares';
import { getDashboardStatsController } from './dashboard.controller';

const router = express.Router();

router.use(protect);
router.get('/stats', getDashboardStatsController);

export default router;
