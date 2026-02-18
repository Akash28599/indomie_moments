import { Response } from 'express';
import { HTTP_STATUS } from '../common/constants';

export function successResponse(
  res: Response,
  payload: Record<string, unknown>,
  statusCode: number = HTTP_STATUS.OK
): void {
  res.status(statusCode).json({ success: true, ...payload });
}

export function errorResponse(
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: unknown
): void {
  const body: { success: false; message: string; details?: unknown } = { success: false, message };
  if (details !== undefined) body.details = details;
  res.status(statusCode).json(body);
}
