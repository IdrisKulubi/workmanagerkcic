-- First make the password column nullable
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";
ALTER TABLE "users" ADD COLUMN "password" varchar(255);
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_last_changed";
ALTER TABLE "users" ADD COLUMN "password_last_changed" timestamp DEFAULT now();
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_reset_token";
ALTER TABLE "users" ADD COLUMN "password_reset_token" varchar(255);
ALTER TABLE "users" DROP COLUMN IF EXISTS "password_reset_expires";
ALTER TABLE "users" ADD COLUMN "password_reset_expires" timestamp;

-- Update existing users with a temporary password (you'll want users to change this)
UPDATE "users" SET "password" = '$2a$12$temp_password_hash_replace_me';

-- Now make password required
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "password_last_changed" SET NOT NULL;