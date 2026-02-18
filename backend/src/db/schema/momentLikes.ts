import {
  pgTable,
  uuid,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { moments } from "./moments";

export const momentLikes = pgTable(
  "moment_likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    momentId: uuid("moment_id")
      .notNull()
      .references(() => moments.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    momentUserUnique: uniqueIndex("moment_likes_moment_user_unique").on(
      t.momentId,
      t.userId
    ),
    momentIdx: index("moment_likes_moment_idx").on(t.momentId),
  })
);

export type MomentLike = typeof momentLikes.$inferSelect;
export type NewMomentLike = typeof momentLikes.$inferInsert;
