import express from 'express';
import { protect, checkRole } from '../../../middlewares';
import {
  createCampaignController,
  getAllCampaignsController,
  getCampaignByIdController,
  updateCampaignController,
  deleteCampaignController,
} from './campaigns.controller';

const router = express.Router();

router.use(protect);

router.post('/', checkRole('admin', 'superadmin'), createCampaignController);
router.get('/', getAllCampaignsController);
router.get('/:id', getCampaignByIdController);
router.put('/:id', checkRole('admin', 'superadmin'), updateCampaignController);
router.delete('/:id', checkRole('superadmin'), deleteCampaignController);

export default router;
