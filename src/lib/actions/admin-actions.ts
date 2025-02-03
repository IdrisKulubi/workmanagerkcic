"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "../auth";
import { users, projects } from "../../../db/schema";
import db from "../../../db/drizzle";
import { DEFAULT_PASSWORD, hashPassword } from "../password-utils";

export async function getEmployeeStats() {
  try {
    // Get total employees
    const totalEmployees = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .then((result) => result[0]?.count || 0);

    // Get department stats
    const departmentStats = await db
      .select({
        department: users.department,
        count: sql<number>`count(*)`,
      })
      .from(users)
      .groupBy(users.department)
      .then((results) =>
        results.map((r) => ({
          department: r.department,
          count: Number(r.count),
        }))
      );

    // Get role distribution
    const roleDistribution = await db
      .select({
        role: users.role,
        count: sql<number>`count(*)`,
      })
      .from(users)
      .groupBy(users.role)
      .then((results) =>
        results.map((r) => ({
          role: r.role,
          count: Number(r.count),
        }))
      );

    // Get project success trends by month
    const projectTrends = await db
      .select({
        name: sql<string>`date_trunc('month', created_at)::text`,
        value: sql<number>`count(case when status = 'won' then 1 end)::float / 
                          nullif(count(*), 0) * 100`,
      })
      .from(projects)
      .groupBy(sql`date_trunc('month', created_at)`)
      .orderBy(sql`date_trunc('month', created_at)`)
      .then((results) =>
        results.map((r) => ({
          name: new Date(r.name).toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          }),
          value: Number(r.value?.toFixed(1)) || 0,
        }))
      );

    return {
      totalEmployees,
      departmentStats,
      roleDistribution,
      revenueData: projectTrends,
      growthRate: 15.5,
      employeeGrowth: 8.2,
    };
  } catch (error) {
    console.error("Error fetching employee stats:", error);
    return {
      totalEmployees: 0,
      departmentStats: [],
      roleDistribution: [],
      revenueData: [],
      growthRate: 0,
      employeeGrowth: 0,
    };
  }
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
      createdAt: new Date(),
      updatedAt: new Date(),
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

export async function getDonorStats() {
  try {
    // Get all unique donors and their project stats
    const donorStats = await db
      .select({
        donor: projects.donor,
        totalProjects: sql<number>`count(*)`,
        wonProjects: sql<number>`count(case when status = 'won' then 1 end)`,
        totalBudget: sql<number>`sum(cast(budget as numeric))`,
      })
      .from(projects)
      .groupBy(projects.donor)
      .orderBy(sql`sum(cast(budget as numeric)) desc`);

    return donorStats.map((donor) => ({
      name: donor.donor,
      totalProjects: Number(donor.totalProjects),
      wonProjects: Number(donor.wonProjects),
      totalBudget: Number(donor.totalBudget || 0),
      successRate: donor.wonProjects
        ? (Number(donor.wonProjects) / Number(donor.totalProjects)) * 100
        : 0,
    }));
  } catch (error) {
    console.error("Error fetching donor stats:", error);
    return [];
  }
}
