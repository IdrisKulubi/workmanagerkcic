"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project } from "../../../db/schema";
import { Badge } from "@/components/ui/badge";

interface ProjectModalProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  const getStatusEmoji = (status: string) => {
    if (status.toLowerCase() === "won") {
      return <span className="animate-bounce inline-block">🎉</span>;
    }
    if (status.toLowerCase() === "lost") {
      return "😔";
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-xl">{project.projectName}</DialogTitle>
            <Badge
              variant={
                project.priority === "A"
                  ? "success"
                  : project.priority === "B"
                  ? "warning"
                  : "info"
              }
            >
              Priority {project.priority}
            </Badge>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                BD Number
              </h4>
              <p>{project.bdNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Department
              </h4>
              <p>{project.department}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Bid Director
              </h4>
              <p>{project.bidDirector}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </h4>
              <p className="flex items-center gap-2">
                {project.status} {getStatusEmoji(project.status)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Deadline
              </h4>
              <p>
                {project.bidsDeadline
                  ? new Date(project.bidsDeadline).toLocaleDateString()
                  : "No deadline"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Budget
              </h4>
              <p>{project.budget ? `USD ${project.budget}.00` : "Not specified"}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
