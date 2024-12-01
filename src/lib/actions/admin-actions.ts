"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "../auth";
import { users } from "../../../db/schema";
import db from "../../../db/drizzle";
import { hashPassword } from "../password-utils";

const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || "";

export async function getEmployeeStats() {
  const totalEmployees = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .then(result => result[0].count);

  const departmentStats = await db
    .select({
      department: users.department,
      count: sql<number>`count(*)`,
    })
    .from(users)
    .groupBy(users.department);

  const roleDistribution = await db
    .select({
      role: users.role,
      count: sql<number>`count(*)`,
    })
    .from(users)
    .groupBy(users.role);

  return {
    totalEmployees,
    departmentStats,
    roleDistribution,
  };
}

export async function updateEmployee(
  id: string,
  data: {
    name?: string;
    email?: string;
    department?: string;
    title?: string;
    role?: string;
  }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role.toLowerCase() !== "admin") {
    throw new Error("Unauthorized");
  }

  await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id));

  revalidatePath("/admin");
}

export async function addEmployee(data: {
  name: string;
  email: string;
  department: string;
  title: string;
  role: string;
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role.toLowerCase() !== "admin") {
      throw new Error("Unauthorized");
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash the default password
    const hashedPassword = await hashPassword(DEFAULT_PASSWORD);

    // Create new employee with default password
    await db.insert(users).values({
      id: `usr_${Date.now()}`,
      ...data,
      password: hashedPassword,
      passwordLastChanged: new Date(),
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
}

export async function deleteEmployee(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role.toLowerCase() !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/admin");
}

export async function forceAllPasswordReset() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role.toLowerCase() !== "admin") {
    throw new Error("Unauthorized");
  }

  
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 15); 
  await db
    .update(users)
    .set({
      passwordLastChanged: twoWeeksAgo,
    })
    .where(sql`true`);

  revalidatePath("/admin");
  return { success: true };
}
