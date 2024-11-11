"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project } from "../../../db/schema";
import { BidManagerStats } from "./bid-manager-stats";

interface BidManagerModalProps {
  bidManager: string;
  projects: Project[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BidManagerModal({
  bidManager,
  projects,
  open,
  onOpenChange,
}: BidManagerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">{bidManager}</DialogTitle>
        </DialogHeader>
        <BidManagerStats projects={projects} bidManager={bidManager} />
      </DialogContent>
    </Dialog>
  );
}
