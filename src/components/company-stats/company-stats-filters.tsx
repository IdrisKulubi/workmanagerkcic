"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "../../../db/schema";

interface CompanyStatsFiltersProps {
  projects: Project[];
}

export function CompanyStatsFilters({ projects }: CompanyStatsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get unique locations from projects
  const uniqueLocations = [...new Set(projects.map(p => p.location))].sort();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projects/stats?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Select
        onValueChange={(value) => handleFilterChange("location", value)}
        defaultValue={searchParams.get("location") || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {uniqueLocations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilterChange("oppType", value)}
        defaultValue={searchParams.get("oppType") || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Opportunity Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Competitive">Competitive</SelectItem>
          <SelectItem value="Non-competitive">Non-competitive</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilterChange("preparation", value)}
        defaultValue={searchParams.get("preparation") || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Preparation Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
