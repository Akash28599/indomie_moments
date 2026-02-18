import express from 'express';
import { protect } from '../../../middlewares';
import {
  getUsersController,
  exportUsersController,
  getUserAnalyticsController,
  exportUserAnalyticsController,
} from './registrations.controller';

const router = express.Router();

router.use(protect);
router.get('/', getUsersController);
router.get('/export', exportUsersController);
router.get('/analytics', getUserAnalyticsController);
router.get('/analytics/export', exportUserAnalyticsController);

export default router;
