"use client";

import { useState } from "react";
import { Project } from "../../../db/schema";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./company-stats-columns";
import { StatCard } from "./stat-card";
import { TableIcon, PieChartIcon } from "lucide-react";
import { Button } from "../ui/button";

function StatusTable({ data }: { data: { name: string; value: number; total: number }[] }) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Status</th>
            <th className="text-right py-2">Count</th>
            <th className="text-right py-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="text-right">{item.value}</td>
              <td className="text-right">
                {((item.value / item.total) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CompanyStats({ projects }: { projects: Project[] }) {
  const [showTableView, setShowTableView] = useState(false);
  const searchParams = useSearchParams();
  const locationFilter = searchParams.get("location");
  const oppTypeFilter = searchParams.get("oppType");
  const prepFilter = searchParams.get("preparation");

  const filteredProjects = projects.filter((project) => {
    const matchesLocation = !locationFilter || project.location === locationFilter;
    const matchesOppType = !oppTypeFilter || 
      project.oppType.toLowerCase() === oppTypeFilter.toLowerCase();
    const matchesPrep = !prepFilter || project.preparation === prepFilter;
    return matchesLocation && matchesOppType && matchesPrep;
  });

  const wonProjects = filteredProjects.filter(
    (p) => p.status.toLowerCase() === "won"
  );
  const lostProjects = filteredProjects.filter(
    (p) => p.status.toLowerCase() === "lost"
  );
  const pendingProjects = filteredProjects.filter(
    (p) => !["won", "lost"].includes(p.status.toLowerCase())
  );

  const successRate = 
    (wonProjects.length / (wonProjects.length + lostProjects.length)) * 100 || 0;

  const mostExpensive = [...filteredProjects].sort(
    (a, b) => Number(b.budget) - Number(a.budget)
  )[0];

  const leastExpensive = [...filteredProjects].sort(
    (a, b) => Number(a.budget) - Number(b.budget)
  )[0];

  // Generate chart data
  const statusData = [
    { name: "Won", value: wonProjects.length, color: "#22c55e" },
    { name: "Lost", value: lostProjects.length, color: "#ef4444" },
    { name: "Pending", value: pendingProjects.length, color: "#3b82f6" },
  ];

  const donorData = Object.entries(
    filteredProjects.reduce((acc, project) => {
      acc[project.donor] = (acc[project.donor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const totalProjects = filteredProjects.length;
  const statusTableData = statusData.map(item => ({
    ...item,
    total: totalProjects
  }));

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={filteredProjects.length}
          description="All projects"
        />
        <StatCard
          title="Success Rate"
          value={`${successRate.toFixed(1)}%`}
          description="Won vs Lost projects"
        />
        <StatCard
          title="Largest Budget"
          value={mostExpensive?.budget ? `$${mostExpensive.budget}` : "N/A"}
          description={mostExpensive?.projectName}
        />
        <StatCard
          title="Smallest Budget"
          value={leastExpensive?.budget ? `$${leastExpensive.budget}` : "N/A"}
          description={leastExpensive?.projectName}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Status Distribution</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTableView(!showTableView)}
            >
              {showTableView ? (
                <PieChartIcon className="h-4 w-4" />
              ) : (
                <TableIcon className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {showTableView ? (
              <StatusTable data={statusTableData} />
            ) : (
              <div className="h-[300px]">
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects Donors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredProjects} />
        </CardContent>
      </Card>
    </div>
  );
}
