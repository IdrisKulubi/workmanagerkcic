"use server";

import db from "../../../db/drizzle";
import { projects } from "../../../db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { NewProject } from "../../../db/schema";

interface ValidationError {
  field: string;
  message: string;
}

function validateProjectData(data: Partial<NewProject>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (data.projectName && data.projectName.length < 3) {
    errors.push({
      field: 'projectName',
      message: 'Project name must be at least 3 characters long'
    });
  }

  if (data.bidsDeadline) {
    const deadline = new Date(data.bidsDeadline);
    if (deadline < new Date()) {
      errors.push({
        field: 'bidsDeadline',
        message: 'Deadline cannot be in the past'
      });
    }
  }

  if (data.budget && (isNaN(Number(data.budget)) || Number(data.budget) <= 0)) {
    errors.push({
      field: 'budget',
      message: 'Budget must be a positive number'
    });
  }

  // Add more validations as needed
  return errors;
}

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

export async function deleteProject(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
      return {
        error: "Unauthorized: Only admins and managers can delete projects",
        success: false,
      };
    }

    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/projects");
    
    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      error: "Failed to delete project",
      success: false,
    };
  }
}

export async function addProject(data: NewProject) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
      return {
        error: "Unauthorized: Only admins and managers can add projects",
        success: false,
        code: 'UNAUTHORIZED'
      };
    }

    // Validate the project data
    const validationErrors = validateProjectData(data);
    if (validationErrors.length > 0) {
      return {
        error: "Validation failed",
        success: false,
        code: 'VALIDATION_ERROR',
        validationErrors
      };
    }

    // Check for duplicate project name
    const existingProject = await db.query.projects.findFirst({
      where: eq(projects.projectName, data.projectName),
    });

    if (existingProject) {
      return {
        error: "A project with this name already exists",
        success: false,
        code: 'DUPLICATE_NAME'
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...projectData } = data;
    await db.insert(projects).values({
      id: `proj_${Date.now()}`,
      ...projectData,
    });

    revalidatePath("/projects");
    return {
      success: true,
      message: "Project created successfully!",
      code: 'SUCCESS'
    };
  } catch (error) {
    console.error("Error adding project:", error);
    return {
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      success: false,
      code: 'SERVER_ERROR',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    };
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      error: "Failed to fetch project",
      success: false,
    };
  }
}

export async function updateProject(id: string, data: Partial<NewProject>) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
      return {
        error: "Unauthorized: Only admins and managers can update projects",
        success: false,
        code: 'UNAUTHORIZED'
      };
    }

    // Validate the project data
    const validationErrors = validateProjectData(data);
    if (validationErrors.length > 0) {
      return {
        error: "Validation failed",
        success: false,
        code: 'VALIDATION_ERROR',
        validationErrors
      };
    }

    // Check if project exists
    const existingProject = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    if (!existingProject) {
      return {
        error: "Project not found",
        success: false,
        code: 'NOT_FOUND'
      };
    }

    await db
      .update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));

    revalidatePath("/projects");
    return {
      success: true,
      message: "Project updated successfully!",
      code: 'SUCCESS'
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      success: false,
      code: 'SERVER_ERROR',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    };
  }
}

export async function toggleProjectLive(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
      return {
        error: "Unauthorized: Only admins and managers can update project status",
        success: false,
      };
    }

    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    if (!project) {
      return {
        error: "Project not found",
        success: false,
      };
    }

    await db
      .update(projects)
      .set({ 
        isLive: !project.isLive,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));

    revalidatePath("/projects");
    revalidatePath("/projects/live");
    return { success: true };
  } catch (error) {
    console.error("Error toggling project live status:", error);
    return {
      error: "Failed to update project status",
      success: false,
    };
  }
}

export async function getProjects() {
  try {
    const allProjects = await db.select().from(projects);
    return allProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
