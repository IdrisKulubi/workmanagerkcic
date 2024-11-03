"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getCurrentUser } from "../auth";
import db from "../../../db/drizzle";
import { events } from "../../../db/schema";

export async function addEvent(data: {
  title: string;
  description: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}) {
  const currentUser = await getCurrentUser();
  if (
    !currentUser ||
    (currentUser.role !== "admin" && currentUser.role !== "manager")
  ) {
    throw new Error("Unauthorized");
  }

  await db.insert(events).values({
    id: `evt_${Date.now()}`,
    ...data,
    status: "active",
  });

  revalidatePath("/dashboard");
}

export async function deleteEvent(id: string) {
  const currentUser = await getCurrentUser();
  if (
    !currentUser ||
    (currentUser.role !== "admin" && currentUser.role !== "manager")
  ) {
    throw new Error("Unauthorized");
  }

  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/dashboard");
}

export async function updateEventStatus() {
  const now = new Date();

  await db
    .update(events)
    .set({ status: "past" })
    .where(eq(events.endDate, now.toISOString().split("T")[0]));

  revalidatePath("/dashboard");
}

export async function getEvents() {
  try {
    const eventsList = await db.select().from(events).orderBy(events.startDate);
    return eventsList;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
