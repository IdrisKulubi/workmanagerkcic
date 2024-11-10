CREATE TABLE IF NOT EXISTS "departments" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "departments_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"opportunity" varchar(255) NOT NULL,
	"project_team" text NOT NULL,
	"action" varchar(100) NOT NULL,
	"action_deadline" date,
	"submission_deadline" date,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"week_of" date NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"bd_number" varchar(255) NOT NULL,
	"bid_link" text,
	"project_name" varchar(255) NOT NULL,
	"priority" varchar(1) NOT NULL,
	"preparation" varchar(50) NOT NULL,
	"position" varchar(50) NOT NULL,
	"department" varchar(100) NOT NULL,
	"bid_director" varchar(255) NOT NULL,
	"bid_manager" varchar(255) NOT NULL,
	"donor" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"opp_type" varchar(100) NOT NULL,
	"status" varchar(100) NOT NULL,
	"notes" text,
	"bids_deadline" date,
	"next_follow_up" date,
	"budget" varchar(255),
	"fee" varchar(255),
	"project_start_date" date,
	"project_end_date" date,
	"probation" boolean DEFAULT false,
	"adjusted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"department" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
