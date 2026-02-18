import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { qrs } from "./qrs";

/** entity_type: 'campaign' | 'location' | etc. entity_id: UUID of that entity. */
export const qrLinks = pgTable(
  "qr_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    qrId: uuid("qr_id")
      .notNull()
      .references(() => qrs.id, { onDelete: "cascade" }),
    entityType: varchar("entity_type", { length: 64 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({ qrLinkEntityUnique: unique().on(t.qrId, t.entityType, t.entityId) })
);

export type QrLink = typeof qrLinks.$inferSelect;
export type NewQrLink = typeof qrLinks.$inferInsert;
