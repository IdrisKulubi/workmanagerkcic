"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "../../../db/schema";
import { Badge } from "@/components/ui/badge";
import { ProjectActions } from "@/components/shared/project-actions-menu";
import { format } from "date-fns";
import { getProjectStyle } from "@/components/projects/project-status-styles";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectName",
    header: "BD Name",
    cell: ({ row }) => {
      const project = row.original;
      const style = getProjectStyle(project);
      return (
        <div className={`${style.text} font-medium`}>{project.projectName}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const project = row.original;
      const style = getProjectStyle(project);
      return <Badge className={style.badge}>{project.status}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return (
        <Badge
          variant={
            priority === "A"
              ? "destructive"
              : priority === "B"
              ? "warning"
              : "secondary"
          }
        >
          Priority {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "bidsDeadline",
    header: "Deadline",
    cell: ({ row }) => {
      const date = row.getValue("bidsDeadline") as Date;
      if (!date) return "No deadline";
      return format(new Date(date), "MMM d, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex justify-end">
          <ProjectActions project={project} userRole={row.original.userRole} />
        </div>
      );
    },
  },
];
