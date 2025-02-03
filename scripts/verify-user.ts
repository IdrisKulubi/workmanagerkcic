import db from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { DEFAULT_PASSWORD } from "../src/lib/password-utils";

async function verifyAndResetUser() {
  const email = "prudence.muriithi@kcicconsulting.com";
  const defaultPassword = DEFAULT_PASSWORD;

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
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

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
    const passwordsMatch = await bcrypt.compare(
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
