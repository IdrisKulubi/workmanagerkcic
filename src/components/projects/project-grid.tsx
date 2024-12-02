"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Project, User } from "../../../db/schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { NoResults } from "./no-results";
import { ProjectModal } from "./project-modal";
import { ProjectActions } from "../shared/project-actions-menu";

interface ProjectGridProps {
  projects: Project[];
  currentUser: User | null;
}

export function ProjectGrid({ projects, currentUser }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const priorityFilter = searchParams.get("priority");
  const statusFilter = searchParams.get("status")?.toLowerCase();
  const departmentFilter = searchParams.get("department");
  const searchQuery = searchParams.get("q")?.toLowerCase();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesPriority = !priorityFilter || project.priority === priorityFilter;
    const matchesStatus = !statusFilter || project.status.toLowerCase() === statusFilter;
    const matchesDepartment = !departmentFilter || project.department === departmentFilter;
    const matchesSearch = !searchQuery || 
      project.projectName.toLowerCase().includes(searchQuery) ||
      project.department.toLowerCase().includes(searchQuery) ||
      project.bdNumber.toLowerCase().includes(searchQuery);

    return matchesPriority && matchesStatus && matchesDepartment && matchesSearch;
  });
  if (filteredProjects.length === 0) {
    return <NoResults />;
  }

  const getStatusEmoji = (status: string) => {
    if (status.toLowerCase() === "won") {
      return <span className="animate-bounce inline-block">🎉</span>;
    }
    if (status.toLowerCase() === "lost") {
      return "😔";
    }
    return null;
  };

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    setSelectedProject(project);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.id}
            onClick={(e) => handleProjectClick(e, project)}
          >
            <Card className="hover:shadow-lg transition-shadow h-[180px] relative">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg truncate">
                    {project.projectName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        project.priority === "A"
                          ? "success"
                          : project.priority === "B"
                          ? "warning"
                          : "info"
                      }
                      className="shrink-0"
                    >
                      {project.priority}
                    </Badge>
                    <ProjectActions 
                      project={project} 
                      userRole={currentUser?.role}
                    />
                  </div>
                </div>
                <CardDescription className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium truncate max-w-[180px]">
                      {project.department}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium flex items-center gap-2">
                      {project.status}
                      {getStatusEmoji(project.status)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">
                      {project.bidsDeadline
                        ? new Date(project.bidsDeadline).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
