"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "../../../db/schema";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "bdNumber",
    header: "BD Number",
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status.toLowerCase() === "won"
              ? "success"
              : status.toLowerCase() === "lost"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
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
              ? "success"
              : priority === "B"
              ? "warning"
              : "default"
          }
        >
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const budget = row.getValue("budget") as string;
      return budget ? `$${budget}` : "N/A";
    },
  },
  {
    accessorKey: "donor",
    header: "Donor",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];
