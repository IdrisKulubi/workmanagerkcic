"use client";

import { useState } from "react";
import { Project } from "../../../db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { ProjectModal } from "@/components/projects/project-modal";
import { Badge } from "@/components/ui/badge";

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const wonProjects = projects.filter(
    (p) => p.status.toLowerCase() === "won"
  ).length;
  const lostProjects = projects.filter(
    (p) => p.status.toLowerCase() === "lost"
  ).length;
  const pendingProjects = projects.filter(
    (p) => !["won", "lost"].includes(p.status.toLowerCase())
  ).length;

  const successRate = (wonProjects / (wonProjects + lostProjects)) * 100 || 0;

  const totalBudget = projects.reduce(
    (sum, project) => sum + (Number(project.budget) || 0),
    0
  );

  const statusData = [
    { name: "Won", value: wonProjects, color: "#22c55e" },
    { name: "Lost", value: lostProjects, color: "#ef4444" },
    { name: "Pending", value: pendingProjects, color: "#3b82f6" },
  ];

  // Recent projects list
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalBudget.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{project.projectName}</span>
                    <span className="text-sm text-muted-foreground">
                      {project.department}
                    </span>
                  </div>
                  <Badge
                    variant={
                      project.status.toLowerCase() === "won"
                        ? "success"
                        : project.status.toLowerCase() === "lost"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
