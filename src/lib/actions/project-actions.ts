"use server";

import db from "../../../db/drizzle";
import { projects } from "../../../db/schema";

export async function getAllProjects() {
  try {
    const projectsList = await db
      .select()
      .from(projects)
      .orderBy(projects.createdAt);

    return {
      success: true,
      data: projectsList,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      error: "Failed to fetch projects. Please try again later.",
      success: false,
    };
  }
}
