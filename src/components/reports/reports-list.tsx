"use client";

import { Project } from "../../../db/schema";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./reports-columns";
import { isWithinDateRange, isWithinBudgetRange } from "@/lib/utils";
export function ReportsList({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const dateRange = searchParams.get("date");
  const typeFilter = searchParams.get("type");
  const budgetFilter = searchParams.get("budget");

  const filteredProjects = projects.filter((project) => {
    // Add date range filter
    const matchesDate =
      !dateRange || isWithinDateRange(project.createdAt, dateRange);

    // Add type filter
    const matchesType =
      !typeFilter ||
      typeFilter === "all" ||
      (typeFilter === "won" && project.status.toLowerCase() === "won") ||
      (typeFilter === "lost" && project.status.toLowerCase() === "lost") ||
      (typeFilter === "ongoing" && project.status.toLowerCase() === "in progress");

    // Add budget filter
    const matchesBudget =
      !budgetFilter ||
      budgetFilter === "all" ||
      isWithinBudgetRange(Number(project.budget), budgetFilter);

    return matchesDate && matchesType && matchesBudget;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={filteredProjects} />
      </CardContent>
    </Card>
  );
}
