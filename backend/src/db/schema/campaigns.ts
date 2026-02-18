import { pgTable, uuid, varchar, text, timestamp, integer, decimal, pgEnum } from 'drizzle-orm/pg-core';

export const campaignStatusEnum = pgEnum('campaign_status', ['draft', 'active', 'paused', 'completed']);

export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: campaignStatusEnum('status').default('draft').notNull(),
  totalBudget: decimal('total_budget', { precision: 10, scale: 2 }),
  spentBudget: decimal('spent_budget', { precision: 10, scale: 2 }).default('0').notNull(),
  totalParticipants: integer('total_participants').default(0).notNull(),
  createdById: uuid('created_by_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;
