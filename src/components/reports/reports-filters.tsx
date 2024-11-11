"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "../../../db/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarX, ArrowLeft } from "lucide-react";

interface ReportsFiltersProps {
  projects: Project[];
}

export function ReportsFilters({ projects }: ReportsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projects/reports?${params.toString()}`);
  };

  const clearDateFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("date");
    router.push(`/projects/reports?${params.toString()}`);
  };

  const goBackToProjects = () => {
    router.push("/projects");
  };

  // Get unique statuses from projects
  const uniqueStatuses = [...new Set(projects.map(p => p.status.toLowerCase()))].sort();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={goBackToProjects}
        className="h-10 w-10"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2">
        <DatePickerWithRange />
        <Button
          variant="ghost"
          size="icon"
          onClick={clearDateFilter}
          className="h-10 w-10"
        >
          <CalendarX className="h-4 w-4" />
        </Button>
      </div>

      <Select
        onValueChange={(value) => handleFilterChange("type", value)}
        defaultValue={searchParams.get("type") || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Project Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {uniqueStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilterChange("budget", value)}
        defaultValue={searchParams.get("budget") || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Budget Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Budgets</SelectItem>
          <SelectItem value="0-100000">$0 - $100,000</SelectItem>
          <SelectItem value="100000-500000">$100,000 - $500,000</SelectItem>
          <SelectItem value="500000-1000000">$500,000 - $1,000,000</SelectItem>
          <SelectItem value="1000000+">$1,000,000+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
