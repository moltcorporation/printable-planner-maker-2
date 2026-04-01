import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const proUsers = pgTable("pro_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  stripePaymentLinkId: text("stripe_payment_link_id").notNull(),
  verifiedAt: timestamp("verified_at").defaultNow(),
});