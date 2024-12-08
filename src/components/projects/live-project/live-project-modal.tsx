"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project } from "../../../../db/schema";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Calendar, Clock, FileText, Target } from "lucide-react";
import { motion } from "framer-motion";

interface LiveProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function LiveProjectModal({ project, onClose }: LiveProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-2xl font-bold">
              {project.projectName}
            </DialogTitle>
            <Badge
              variant="default"
              className="bg-green-500 text-white animate-pulse"
            >
              Live
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Department
                </h3>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{project.department}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Bid Manager
                </h3>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{project.bidManager}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Bid Director
                </h3>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">{project.bidDirector}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Deadline
                </h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {project.bidsDeadline
                      ? new Date(project.bidsDeadline).toLocaleDateString()
                      : "No deadline"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Time Remaining
                </h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    {project.bidsDeadline
                      ? calculateTimeRemaining(new Date(project.bidsDeadline))
                      : "No deadline"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Budget
                </h3>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">
                    {project.budget ? `$${project.budget.toLocaleString()}` : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <h3 className="text-lg font-semibold">Project Notes</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{project.notes || "No notes available"}</p>
            </div>
          </motion.div>

          {/* Discussion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-lg font-semibold">Key Discussion Points</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Technical:</span>
                <p className="text-sm">Review technical requirements and capabilities</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Financial:</span>
                <p className="text-sm">Discuss budget allocation and resource planning</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Timeline:</span>
                <p className="text-sm">Evaluate project timeline and milestones</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Risks:</span>
                <p className="text-sm">Identify potential risks and mitigation strategies</p>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function calculateTimeRemaining(deadline: Date): string {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  
  if (diff <= 0) return "Deadline passed";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ${hours} hour${hours === 1 ? '' : 's'}`;
  }
  return `${hours} hour${hours === 1 ? '' : 's'}`;
} 