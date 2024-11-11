"use client";

import { Project } from "../../../db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface BidManagerStatsProps {
  projects: Project[];
  bidManager: string;
}

export function BidManagerStats({ projects, bidManager }: BidManagerStatsProps) {
  const managerProjects = projects.filter(
    (project) => project.bidManager === bidManager
  );

  const wonProjects = managerProjects.filter(
    (project) => project.status.toLowerCase() === "won"
  ).length;
  const lostProjects = managerProjects.filter(
    (project) => project.status.toLowerCase() === "lost"
  ).length;
  const ongoingProjects = managerProjects.filter(
    (project) => !["won", "lost"].includes(project.status.toLowerCase())
  ).length;

  const successRate = (wonProjects / (wonProjects + lostProjects)) * 100 || 0;

  const chartData = [
    { name: "Won", value: wonProjects, color: "#22c55e" },
    { name: "Lost", value: lostProjects, color: "#ef4444" },
    { name: "Ongoing", value: ongoingProjects, color: "#3b82f6" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Success rate and project distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Success Rate</span>
              <span className="text-sm font-medium">{successRate.toFixed(1)}%</span>
            </div>
            <Progress value={successRate} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-500">
                {wonProjects}
              </div>
              <div className="text-sm text-muted-foreground">Won</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">
                {lostProjects}
              </div>
              <div className="text-sm text-muted-foreground">Lost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {ongoingProjects}
              </div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Distribution</CardTitle>
          <CardDescription>
            Visual breakdown of project statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
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
    </div>
  );
}
