"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CompanyStatsFilters } from "./company-stats-filters";
import { Project } from "../../../db/schema";

interface StatsFiltersProps {
  projects: Project[];
}

export function StatsFilters({ projects }: StatsFiltersProps) {
  const router = useRouter();

  const goBackToProjects = () => {
    router.push("/projects");
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={goBackToProjects}
        className="h-10 w-10"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <CompanyStatsFilters projects={projects} />
    </div>
  );
} 