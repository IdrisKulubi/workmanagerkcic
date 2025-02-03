import db from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  hashPassword,
  verifyPassword,
} from "../src/lib/server/password-server";
import { getDefaultPassword } from "../src/lib/utils/password-config";

async function verifyAndResetUser() {
  const email = "prudence.muriithi@kcicconsulting.com";
  const defaultPassword = getDefaultPassword();

  try {
    // 1. Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      console.log("User not found");
      return;
    }

    console.log("User found:", {
      id: user.id,
      email: user.email,
      passwordLength: user.password?.length || 0,
    });

    // 2. Reset password
    const hashedPassword = await hashPassword(defaultPassword);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
        passwordLastChanged: new Date(),
      })
      .where(eq(users.email, email));

    // 3. Verify the update
    const updatedUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // 4. Test password match
    const passwordsMatch = await verifyPassword(
      defaultPassword,
      updatedUser!.password
    );

    console.log("Password reset complete");
    console.log(
      "Password verification test:",
      passwordsMatch ? "PASSED" : "FAILED"
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

verifyAndResetUser();
