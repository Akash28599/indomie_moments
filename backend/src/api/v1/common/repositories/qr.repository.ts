import { eq, and } from 'drizzle-orm';
import { db } from '../../../../db';
import { qrs, qrLinks } from '../../../../db/schema';
import type { Qr } from '../../../../db/schema';

export const ENTITY_TYPES = { CAMPAIGN: 'campaign', LOCATION: 'location' } as const;

export async function findQrsByEntityRepo(entityType: string, entityId: string): Promise<Qr[]> {
  const rows = await db
    .select({ qr: qrs })
    .from(qrLinks)
    .innerJoin(qrs, eq(qrLinks.qrId, qrs.id))
    .where(and(eq(qrLinks.entityType, entityType), eq(qrLinks.entityId, entityId)));
  return rows.map((r) => r.qr);
}

export async function createQrWithLinkRepo(p: {
  targetUrl: string;
  label?: string | null;
  entityType: string;
  entityId: string;
}): Promise<Qr> {
  const [qr] = await db.insert(qrs).values({ targetUrl: p.targetUrl, label: p.label ?? null }).returning();
  if (!qr) throw new Error('Failed to create QR');
  await db.insert(qrLinks).values({
    qrId: qr.id,
    entityType: p.entityType,
    entityId: p.entityId,
  });
  return qr;
}

export async function replaceQrsForEntityRepo(
  entityType: string,
  entityId: string,
  items: { url: string; label?: string | null }[]
): Promise<Qr[]> {
  const links = await db
    .select({ qrId: qrLinks.qrId })
    .from(qrLinks)
    .where(and(eq(qrLinks.entityType, entityType), eq(qrLinks.entityId, entityId)));
  const qrIds = [...new Set(links.map((l) => l.qrId))];

  await db
    .delete(qrLinks)
    .where(and(eq(qrLinks.entityType, entityType), eq(qrLinks.entityId, entityId)));

  for (const qid of qrIds) {
    const [rest] = await db.select().from(qrLinks).where(eq(qrLinks.qrId, qid)).limit(1);
    if (!rest) await db.delete(qrs).where(eq(qrs.id, qid));
  }

  const created: Qr[] = [];
  for (const it of items) {
    const qr = await createQrWithLinkRepo({
      targetUrl: it.url,
      label: it.label ?? null,
      entityType,
      entityId,
    });
    created.push(qr);
  }
  return created;
}

export async function deleteQrsForEntityRepo(entityType: string, entityId: string): Promise<void> {
  const links = await db
    .select({ qrId: qrLinks.qrId })
    .from(qrLinks)
    .where(and(eq(qrLinks.entityType, entityType), eq(qrLinks.entityId, entityId)));
  const qrIds = [...new Set(links.map((l) => l.qrId))];

  await db
    .delete(qrLinks)
    .where(and(eq(qrLinks.entityType, entityType), eq(qrLinks.entityId, entityId)));

  for (const qid of qrIds) {
    const [rest] = await db.select().from(qrLinks).where(eq(qrLinks.qrId, qid)).limit(1);
    if (!rest) await db.delete(qrs).where(eq(qrs.id, qid));
  }
}
