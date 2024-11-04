"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEPARTMENTS = ["All", "BSA", "Communication"];

export function DepartmentFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDepartment = searchParams.get("department") || "All";

  const handleDepartmentChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All") {
      params.delete("department");
    } else {
      params.set("department", value);
    }
    router.push(`/company?${params.toString()}`);
  };

  return (
    <Select value={currentDepartment} onValueChange={handleDepartmentChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select department" />
      </SelectTrigger>
      <SelectContent>
        {DEPARTMENTS.map((dept) => (
          <SelectItem key={dept} value={dept}>
            {dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
