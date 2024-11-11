"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "../../../db/schema";

export function ProjectList({ projects }: { projects: Project[] }) {
  const [sortField, setSortField] = useState<keyof Project>("projectName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: keyof Project) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("projectName")}
              className="cursor-pointer"
            >
              Project Name
            </TableHead>
            <TableHead
              onClick={() => handleSort("bdNumber")}
              className="cursor-pointer"
            >
              BD Number
            </TableHead>
            <TableHead
              onClick={() => handleSort("priority")}
              className="cursor-pointer"
            >
              Priority
            </TableHead>
            <TableHead
              onClick={() => handleSort("department")}
              className="cursor-pointer"
            >
              Department
            </TableHead>
            <TableHead
              onClick={() => handleSort("bidDirector")}
              className="cursor-pointer"
            >
              Bid Director
            </TableHead>
            <TableHead
              onClick={() => handleSort("status")}
              className="cursor-pointer"
            >
              Status
            </TableHead>
            <TableHead
              onClick={() => handleSort("bidsDeadline")}
              className="cursor-pointer"
            >
              Deadline
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{project.bdNumber}</TableCell>
              <TableCell>{project.priority}</TableCell>
              <TableCell>{project.department}</TableCell>
              <TableCell>{project.bidDirector}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>
                {project.bidsDeadline ? new Date(project.bidsDeadline).toLocaleDateString() : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
