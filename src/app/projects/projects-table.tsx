"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "../../../db/schema";
import { getProjectStyle, ProjectStatusBadge } from "@/components/projects/project-status-styles";
import { useState } from "react";
import { ProjectModal } from "@/components/projects/project-modal";
import { ProjectActions } from "@/components/shared/project-actions-menu";
import { Badge } from "@/components/ui/badge";

interface ProjectsTableProps {
  projects: Project[];
  currentUser: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export function ProjectsTable({ projects, currentUser }: ProjectsTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleRowClick = (e: React.MouseEvent, project: Project) => {
    if ((e.target as HTMLElement).closest('.actions-menu')) {
      return;
    }
    setSelectedProject(project);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Bd Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const style = getProjectStyle(project);
              return (
                <TableRow
                  key={project.id}
                  className={style.row}
                  onClick={(e) => handleRowClick(e, project)}
                >
                  <TableCell className="font-medium">
                    {project.projectName}
                  </TableCell>
                  <TableCell>
                    <ProjectStatusBadge project={project} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Priority {project.priority}</Badge>
                  </TableCell>
                  <TableCell>{project.department}</TableCell>
                  <TableCell>
                    {project.bidsDeadline
                      ? new Date(project.bidsDeadline).toLocaleDateString()
                      : "No deadline"}
                  </TableCell>
                  <TableCell className="actions-menu">
                    <ProjectActions 
                      project={project} 
                      userRole={currentUser?.role}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
