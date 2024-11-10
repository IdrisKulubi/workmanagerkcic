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
  try {
    const currentUser = await getCurrentUser();
    if (
      !currentUser ||
      (currentUser.role !== "admin" && currentUser.role !== "manager")
    ) {
      return {
        error: "Unauthorized: Only admins and managers can add events",
        success: false,
      };
    }

    await db.insert(events).values({
      id: `evt_${Date.now()}`,
      ...data,
      submissionDeadline: data.endDate,
      status: "active",
      opportunity: "default",
      projectTeam: "default",
      action: "event",
      weekOf: data.startDate
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      message: `Event "${data.title}" has been successfully created`,
    };
  } catch (error) {
    console.error("Error adding event:", error);
    return {
      error: "Failed to add event. Please try again later.",
      success: false,
    };
  }
}

export async function deleteEvent(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (
      !currentUser ||
      (currentUser.role !== "admin" && currentUser.role !== "manager")
    ) {
      return {
        error: "Unauthorized: Only admins and managers can delete events",
        success: false,
      };
    }

    await db.delete(events).where(eq(events.id, id));
    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Event has been successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      error: "Failed to delete event. Please try again later.",
      success: false,
    };
  }
}

export async function updateEventStatus() {
  try {
    const now = new Date();
    await db
      .update(events)
      .set({ status: "past" })
      .where(eq(events.submissionDeadline, now.toISOString().split("T")[0]));

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Event statuses have been updated",
    };
  } catch (error) {
    console.error("Error updating event status:", error);
    return {
      error: "Failed to update event statuses",
      success: false,
    };
  }
}

export async function getEvents() {
  try {
    const eventsList = await db.select().from(events).orderBy(events.weekOf);
    return {
      success: true,
      data: eventsList,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      error: "Failed to fetch events. Please try again later.",
      success: false,
    };
  }
}
