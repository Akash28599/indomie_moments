import { generateQRFromUrl } from '../../../utils/qrGenerator';
import { ENTITY_TYPES, findQrsByEntityRepo, createQrWithLinkRepo, replaceQrsForEntityRepo, deleteQrsForEntityRepo } from '../../../common/repositories/qr.repository';
import type { NewCampaign, CampaignUpdatePayload } from './campaigns.types';
import {
  createCampaignRepo,
  findAllCampaignsRepo,
  findCampaignByIdRepo,
  updateCampaignRepo,
  deleteCampaignRepo,
} from './campaigns.repository';

export type QrCodeItem = { id: string; targetUrl: string; label: string | null; dataUrl: string };

async function buildQrCodes(qrs: { id: string; targetUrl: string; label: string | null }[]): Promise<QrCodeItem[]> {
  const out: QrCodeItem[] = [];
  for (const qr of qrs) {
    const dataUrl = await generateQRFromUrl(qr.targetUrl);
    out.push({ id: qr.id, targetUrl: qr.targetUrl, label: qr.label, dataUrl });
  }
  return out;
}

function parseQrUrls(body: Record<string, unknown>): { url: string; label?: string | null }[] {
  const raw = body.qrUrls;
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((x): x is { url: string; label?: unknown } => x != null && typeof x === "object" && typeof (x as Record<string, unknown>).url === "string")
    .map((x) => ({
      url: x.url.trim(),
      label: x.label != null ? String(x.label).trim() || null : null,
    }))
    .filter((x) => x.url.length > 0);
}

export async function createCampaignService(adminId: string, body: Record<string, unknown>) {
  const { name, description, startDate, endDate, status, totalBudget } = body;
  const data: NewCampaign = {
    name: name as string,
    description: description as string,
    startDate: new Date(startDate as string),
    endDate: new Date(endDate as string),
    status: (status as 'draft' | 'active' | 'paused' | 'completed') || 'draft',
    totalBudget: totalBudget ? String(totalBudget) : null,
    createdById: adminId,
  };
  const campaign = await createCampaignRepo(data);
  const qrUrls = parseQrUrls(body);
  const qrList: { id: string; targetUrl: string; label: string | null }[] = [];
  for (const it of qrUrls) {
    const qr = await createQrWithLinkRepo({
      targetUrl: it.url,
      label: it.label ?? null,
      entityType: ENTITY_TYPES.CAMPAIGN,
      entityId: campaign.id,
    });
    qrList.push({ id: qr.id, targetUrl: qr.targetUrl, label: qr.label });
  }
  const qrCodes = await buildQrCodes(qrList);
  return { campaign, qrCodes };
}

export async function getAllCampaignsService() {
  return findAllCampaignsRepo();
}

export async function getCampaignByIdService(id: string) {
  const c = await findCampaignByIdRepo(id);
  if (!c) return null;
  const qrList = await findQrsByEntityRepo(ENTITY_TYPES.CAMPAIGN, id);
  const qrCodes = await buildQrCodes(
    qrList.map((q) => ({ id: q.id, targetUrl: q.targetUrl, label: q.label }))
  );
  return { campaign: c, qrCodes };
}

export async function updateCampaignService(id: string, body: Record<string, unknown>) {
  const existing = await findCampaignByIdRepo(id);
  if (!existing) return null;
  const updateData: CampaignUpdatePayload = {};
  const map: Record<string, keyof CampaignUpdatePayload> = {
    name: 'name',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    totalBudget: 'totalBudget',
    spentBudget: 'spentBudget',
    totalParticipants: 'totalParticipants',
  };
  for (const [k, key] of Object.entries(map)) {
    const v = body[k];
    if (v === undefined) continue;
    if (k === "startDate" || k === "endDate") {
      (updateData as Record<string, unknown>)[key] = new Date(v as string);
    } else if (k === "totalBudget" || k === "spentBudget" || k === "totalParticipants") {
      (updateData as Record<string, unknown>)[key] = v != null ? (typeof v === "number" ? v : String(v)) : null;
    } else {
      (updateData as Record<string, unknown>)[key] = v;
    }
  }
  const campaign = await updateCampaignRepo(id, updateData);

  let qrList: { id: string; targetUrl: string; label: string | null }[] = [];
  if ('qrUrls' in body) {
    const qrUrls = parseQrUrls(body);
    const replaced = await replaceQrsForEntityRepo(ENTITY_TYPES.CAMPAIGN, id, qrUrls);
    qrList = replaced.map((q) => ({ id: q.id, targetUrl: q.targetUrl, label: q.label }));
  } else {
    const existingQrs = await findQrsByEntityRepo(ENTITY_TYPES.CAMPAIGN, id);
    qrList = existingQrs.map((q) => ({ id: q.id, targetUrl: q.targetUrl, label: q.label }));
  }
  const qrCodes = await buildQrCodes(qrList);
  return { campaign, qrCodes };
}

export async function deleteCampaignService(id: string) {
  const existing = await findCampaignByIdRepo(id);
  if (!existing) return false;
  await deleteQrsForEntityRepo(ENTITY_TYPES.CAMPAIGN, id);
  await deleteCampaignRepo(id);
  return true;
}
