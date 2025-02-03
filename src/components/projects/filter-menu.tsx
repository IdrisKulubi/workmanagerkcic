"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const priorities = [
  { label: "All Priorities", value: "" },
  { label: "Priority A", value: "A" },
  { label: "Priority B", value: "B" },
  { label: "Priority C", value: "C" },
];

const statuses = [
  { label: "All Statuses", value: "" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
  { label: "Ongoing", value: "ongoing" },
];

const departments = [
  { label: "All Departments", value: "" },
  { label: "BD", value: "BD" },
  { label: "SAS", value: "SAS" },
  { label: "PSD", value: "PSD" },
  { label: "TD", value: "TD" },
];

export function FilterMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPriority = searchParams.get("priority") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentDepartment = searchParams.get("department") || "";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  const getActiveFiltersCount = () => {
    return [currentPriority, currentStatus, currentDepartment].filter(Boolean)
      .length;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {getActiveFiltersCount() > 0 && (
            <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
              {getActiveFiltersCount()}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Priority</h4>
            <RadioGroup
              value={currentPriority}
              onValueChange={(value) => handleFilterChange("priority", value)}
              className="grid gap-2"
            >
              {priorities.map((priority) => (
                <div
                  key={priority.value}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={priority.value}
                    id={`priority-${priority.value}`}
                  />
                  <Label htmlFor={`priority-${priority.value}`}>
                    {priority.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <RadioGroup
              value={currentStatus}
              onValueChange={(value) => handleFilterChange("status", value)}
              className="grid gap-2"
            >
              {statuses.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={status.value}
                    id={`status-${status.value}`}
                  />
                  <Label htmlFor={`status-${status.value}`}>
                    {status.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Department</h4>
            <RadioGroup
              value={currentDepartment}
              onValueChange={(value) => handleFilterChange("department", value)}
              className="grid gap-2"
            >
              {departments.map((dept) => (
                <div key={dept.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={dept.value}
                    id={`dept-${dept.value}`}
                  />
                  <Label htmlFor={`dept-${dept.value}`}>{dept.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
