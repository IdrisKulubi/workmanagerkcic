"use client";

import { Project } from "../../../db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/components/forecasts/forecasts-columns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ForecastsList({ projects }: { projects: Project[] }) {
  const pendingProjects = projects.filter(
    (p) => !["won", "lost"].includes(p.status.toLowerCase())
  );

  const totalPotentialValue = pendingProjects.reduce(
    (sum, project) => sum + (Number(project.budget) || 0),
    0
  );

  // Group by client/department for analysis
  const clientAnalysis = pendingProjects.reduce((acc, project) => {
    const client = project.department;
    if (!acc[client]) {
      acc[client] = {
        name: client,
        count: 0,
        totalValue: 0,
      };
    }
    acc[client].count += 1;
    acc[client].totalValue += Number(project.budget) || 0;
    return acc;
  }, {} as Record<string, { name: string; count: number; totalValue: number }>);

  const clientData = Object.values(clientAnalysis).sort(
    (a, b) => b.totalValue - a.totalValue
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Potential Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPotentialValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              If all pending Bds are won
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Pending Bds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Bds in pipeline
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Average Project Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(totalPotentialValue / pendingProjects.length || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per Bd</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                />
                <Bar dataKey="totalValue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Bds</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={pendingProjects} />
        </CardContent>
      </Card>
    </div>
  );
} 