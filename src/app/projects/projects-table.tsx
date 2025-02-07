"use client";

import { Project } from "../../../db/schema";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";

interface ProjectsTableProps {
  projects: Project[];
  currentUser: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function ProjectsTable({ projects, currentUser }: ProjectsTableProps) {
  // Add user role to each project for the actions menu
  const projectsWithRole = projects.map((project) => ({
    ...project,
    userRole: currentUser.role,
  }));

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={projectsWithRole} />
    </div>
  );
}
