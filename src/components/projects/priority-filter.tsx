"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const priorities = [
  { label: "All Projects", value: "" },
  { label: "Priority A", value: "A" },
  { label: "Priority B", value: "B" },
  { label: "Priority C", value: "C" },
];

export function PriorityFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPriority = searchParams.get("priority") || "";

  const handlePriorityChange = (priority: string) => {
    const params = new URLSearchParams(searchParams);
    if (priority) {
      params.set("priority", priority);
    } else {
      params.delete("priority");
    }
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          {currentPriority ? `Priority ${currentPriority}` : "All Projects"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-3">
        <RadioGroup
          defaultValue={currentPriority}
          onValueChange={handlePriorityChange}
          className="grid gap-2"
        >
          {priorities.map((priority) => (
            <div
              key={priority.value}
              className="flex items-center space-x-2 rounded-md px-2 py-1 hover:bg-accent"
            >
              <RadioGroupItem value={priority.value} id={priority.value} />
              <Label
                htmlFor={priority.value}
                className="flex-grow cursor-pointer text-sm"
              >
                {priority.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
