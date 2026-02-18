import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const qrs = pgTable("qrs", {
  id: uuid("id").defaultRandom().primaryKey(),
  targetUrl: text("target_url").notNull(),
  label: varchar("label", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Qr = typeof qrs.$inferSelect;
export type NewQr = typeof qrs.$inferInsert;
