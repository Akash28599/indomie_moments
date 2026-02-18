import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, ERROR_MESSAGES } from "../../../common/constants";
import { successResponse, errorResponse } from "../../../utils/responseFormatter";
import { logger } from "../../../../../lib/logger";
import {
  createCampaignService,
  getAllCampaignsService,
  getCampaignByIdService,
  updateCampaignService,
  deleteCampaignService,
} from "./campaigns.service";

export async function createCampaignController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.admin) {
      errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      return;
    }
    const { campaign, qrCodes } = await createCampaignService(req.admin.id, req.body);
    successResponse(res, { message: "Campaign created successfully", campaign, qrCodes }, HTTP_STATUS.CREATED);
  } catch (err) {
    logger.error("Create campaign error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function getAllCampaignsController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const campaigns = await getAllCampaignsService();
    successResponse(res, { campaigns });
  } catch (err) {
    logger.error("Get campaigns error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function getCampaignByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    const result = await getCampaignByIdService(id);
    if (!result) {
      errorResponse(res, ERROR_MESSAGES.CAMPAIGN_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    successResponse(res, { campaign: result.campaign, qrCodes: result.qrCodes });
  } catch (err) {
    logger.error("Get campaign error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function updateCampaignController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    const updated = await updateCampaignService(id, req.body);
    if (!updated) {
      errorResponse(res, ERROR_MESSAGES.CAMPAIGN_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    successResponse(res, { message: "Campaign updated successfully", campaign: updated.campaign, qrCodes: updated.qrCodes });
  } catch (err) {
    logger.error("Update campaign error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function deleteCampaignController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = typeof req.params.id === "string" ? req.params.id : req.params.id[0];
    const found = await deleteCampaignService(id);
    if (!found) {
      errorResponse(res, ERROR_MESSAGES.CAMPAIGN_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }
    successResponse(res, { message: "Campaign deleted successfully" });
  } catch (err) {
    logger.error("Delete campaign error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}
