/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import { projects, users } from "../../../db/schema";
import db from "../../../db/drizzle";
import { getCurrentUser } from "../auth";
import { NotificationType } from "../notifications/notifications-context";

export async function getWeeklySummary() {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  // Get new projects
  const newProjects = await db
    .select()
    .from(projects)
    .where(gte(projects.createdAt, startOfWeek));

  // Get won projects
  const wonProjects = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.status, "won"),
        gte(projects.updatedAt, startOfWeek)
      )
    );

  // Get upcoming deadlines (next 7 days)
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const upcomingDeadlines = await db
    .select()
    .from(projects)
    .where(
      and(
        gte(projects.bidsDeadline, sql`${new Date().toISOString()}`),
        lte(projects.bidsDeadline, sql`${nextWeek.toISOString()}`)
      )
    );

  // Get new employees
  const newEmployees = await db
    .select()
    .from(users)
    .where(gte(users.createdAt, startOfWeek));

  return {
    newProjects: newProjects.length,
    wonProjects: wonProjects.map(p => p.projectName),
    upcomingDeadlines: upcomingDeadlines.map(p => ({
      name: p.projectName,
      deadline: p.bidsDeadline!
    })),
    newEmployees: newEmployees.map(e => e.name)
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createNotification(data: {
  type: NotificationType;
  title: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
  data?: Record<string, string>;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  // For now, we'll just revalidate the path
  revalidatePath("/");
  return { success: true };
}

export async function markNotificationAsRead(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  // Here you would typically update the notification in your database
  // For now, we'll just revalidate the path
  revalidatePath("/");
  return { success: true };
} 