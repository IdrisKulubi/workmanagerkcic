import { z } from "zod";

// Define status options as an enum
export const ProjectStatus = [
  "Won",
  "Lost",
  "Tender Submitted",
  "EOI Submitted",
  "In Progress",
  "Forecast",
  "Cancelled",
  "On Hold",
] as const;

// Define department options
export const Departments = ["BD", "SAS", "PSD", "TA"] as const;

export const PreparationLevels = ["High", "Medium", "Low"] as const;
export type PreparationLevel = (typeof PreparationLevels)[number];

export const Positions = ["Lead", "Partner"] as const;

export type Position = (typeof Positions)[number];

export const Opportunities = ["Competitive", "Non-competitive"] as const;
export type OpportunityType = (typeof Opportunities)[number];

export const Priorities = ["A", "B", "C"] as const;
export type Priority = (typeof Priorities)[number];

export const projectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  bdNumber: z.string().min(1, "BD number is required"),
  bidLink: z.string().optional(),
  priority: z.enum(["A", "B", "C"], {
    required_error: "Priority is required",
    invalid_type_error: "Priority must be A, B, or C",
  }),
  preparation: z.enum(PreparationLevels, {
    required_error: "Preparation level is required",
  }),
  position: z.enum(["Lead", "Partner"], {
    required_error: "Position is required",
  }),
  department: z.enum(Departments, {
    required_error: "Department is required",
  }),
  bidDirector: z.string().min(1, "Bid director is required"),
  bidManager: z.string().min(1, "Bid manager is required"),
  donor: z.string().min(1, "Donor is required"),
  location: z.string().min(1, "Location is required"),
  oppType: z.enum(["Competitive", "Non-competitive"], {
    required_error: "Opportunity type is required",
  }),
  status: z.enum(ProjectStatus, {
    required_error: "Status is required",
  }),
  notes: z.string().optional().nullable(),
  bidsDeadline: z.string().optional().nullable(),
  nextFollowUp: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  fee: z.string().optional().nullable(),
  projectStartDate: z.string().optional().nullable(),
  projectEndDate: z.string().optional().nullable(),
  probation: z.boolean().default(false),
  adjusted: z.boolean().default(false),
});

// Export types for use in components
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type ProjectStatus = (typeof ProjectStatus)[number];
export type Department = (typeof Departments)[number];

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
