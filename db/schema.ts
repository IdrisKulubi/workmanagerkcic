import { date, pgTable, text, timestamp, varchar,  boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  passwordLastChanged: timestamp("password_last_changed").defaultNow().notNull(),
  passwordResetToken: varchar("password_reset_token", { length: 255 }),
  passwordResetExpires: timestamp("password_reset_expires"),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  department: varchar("department", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export const events = pgTable("events", {
  id: text("id").primaryKey().notNull(),
  opportunity: varchar("opportunity", { length: 255 }).notNull(),
  projectTeam: text("project_team").notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  actionDeadline: date("action_deadline"),
  submissionDeadline: date("submission_deadline"),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  weekOf: date("week_of").notNull(),
  notes: text("notes"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export const departments = pgTable("departments", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey().notNull(),
  bdNumber: varchar("bd_number", { length: 255 }).notNull(),
  bidLink: text("bid_link"),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  priority: varchar("priority", { length: 1 }).notNull(), // A, B, or C
  preparation: varchar("preparation", { length: 50 }).notNull(), // High, Medium, Low
  position: varchar("position", { length: 50 }).notNull(), // Lead, Partner
  department: varchar("department", { length: 100 }).notNull(),
  bidDirector: varchar("bid_director", { length: 255 }).notNull(),
  bidManager: varchar("bid_manager", { length: 255 }).notNull(),
  donor: varchar("donor", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  oppType: varchar("opp_type", { length: 100 }).notNull(), // Competitive, non-competitive
  status: varchar("status", { length: 100 }).notNull(), // Won, Lost, Tender Submitted, etc.
  notes: text("notes"),
  bidsDeadline: date("bids_deadline"),
  nextFollowUp: date("next_follow_up"),
  budget: varchar("budget", { length: 255 }),
  fee: varchar("fee", { length: 255 }),
  projectStartDate: date("project_start_date"),
  projectEndDate: date("project_end_date"),
  probation: boolean("probation").default(false),
  adjusted: boolean("adjusted").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;