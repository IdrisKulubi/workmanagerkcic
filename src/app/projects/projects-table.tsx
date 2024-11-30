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
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteProject } from "@/lib/actions/project-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectModal } from "@/components/projects/project-modal";
import { motion } from "framer-motion";

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
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setLoading(id);
      await deleteProject(id);
      setLoading(null);
      router.refresh();
    }
  };

  const handleRowClick = (e: React.MouseEvent, project: Project) => {
    // Prevent row click if clicking on the actions menu
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
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <motion.tr
                key={project.id}
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: "rgba(0,0,0,0.02)",
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer hover:bg-muted/50"
                onClick={(e) => handleRowClick(e, project)}
              >
                <TableCell className="font-medium">
                  {project.projectName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status.toLowerCase() === "won"
                        ? "success"
                        : project.status.toLowerCase() === "lost"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
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
                  {(currentUser?.role === "admin" ||
                    currentUser?.role === "manager") && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled={loading === project.id}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/projects/${project.id}/edit`}>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(project.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </motion.tr>
            ))}
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
