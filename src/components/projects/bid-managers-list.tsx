"use client";

import { useState } from "react";
import { Project } from "../../../db/schema";
import { Button } from "@/components/ui/button";
import { BidManagerModal } from "./bid-manager-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users } from "lucide-react";

interface BidManagersListProps {
  bidManagers: string[];
  projects: Project[];
}

export function BidManagersList({ bidManagers, projects }: BidManagersListProps) {
  const [selectedManager, setSelectedManager] = useState<string | null>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Users className="h-4 w-4" />
            Bid Managers ({bidManagers.length})
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <div className="grid gap-1">
            {bidManagers.map((manager) => (
              <Button
                key={manager}
                variant="ghost"
                className="w-full justify-start font-normal"
                onClick={() => setSelectedManager(manager)}
              >
                {manager}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {selectedManager && (
        <BidManagerModal
          bidManager={selectedManager}
          projects={projects}
          open={!!selectedManager}
          onOpenChange={(open) => !open && setSelectedManager(null)}
        />
      )}
    </>
  );
}
