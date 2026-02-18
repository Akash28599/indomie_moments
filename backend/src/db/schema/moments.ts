import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const momentStatusEnum = pgEnum("moment_status", [
  "pending",
  "approved",
  "rejected",
]);

export const moments = pgTable(
  "moments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 32 }).notNull().unique(),
    imageUrl: varchar("image_url", { length: 500 }).notNull(),
    caption: text("caption").notNull(),
    consentGiven: boolean("consent_given").default(true).notNull(),
    status: momentStatusEnum("status").default("pending").notNull(),
    currentWeek: boolean("current_week").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    statusIdx: index("moments_status_idx").on(t.status),
    currentWeekIdx: index("moments_current_week_idx").on(t.currentWeek),
  })
);

export type Moment = typeof moments.$inferSelect;
export type NewMoment = typeof moments.$inferInsert;
