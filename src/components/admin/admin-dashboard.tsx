"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeForm } from "./employee-form";
import { getEmployeeStats, forceAllPasswordReset } from "@/lib/actions/admin-actions";
import { Users, UserPlus, Briefcase, Award, TrendingUp,  Shield } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,

  BarChart,
  Bar,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Project } from "../../../db/schema";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

interface DepartmentStat {
  department: string;
  count: number;
}

interface RoleStat {
  role: string;
  count: number;
}

interface RevenueData {
  name: string;
  value: number;
}

interface DashboardStats {
  totalEmployees: number;
  departmentStats: DepartmentStat[];
  roleDistribution: RoleStat[];
  revenueData: RevenueData[];
  growthRate: number;
  employeeGrowth: number;
}

export function AdminDashboard({ projects }: { projects: Project[] }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    departmentStats: [],
    roleDistribution: [],
    revenueData: [],
    growthRate: 15.5,
    employeeGrowth: 8.2,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getEmployeeStats();
      setStats(prev => ({ ...prev, ...data }));
    };
    fetchStats();
  }, []);

  const metrics = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      trend: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Revenue Growth",
      value: "15.5%",
      trend: "+5.2%",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Departments",
      value: stats.departmentStats.length,
      trend: "Stable",
      icon: Briefcase,
      color: "orange",
    },
    {
      title: "Employee Growth",
      value: "8.2%",
      trend: "+2.1%",
      icon: Award,
      color: "purple",
    },
  ];

  const handleForcePasswordReset = async () => {
    try {
      await forceAllPasswordReset();
      toast({
        title: "Success",
        description: "All users will be required to reset their passwords on next login",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to force password reset",
      });
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Executive Dashboard
        </motion.h1>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                    <p className={`text-sm mt-1 text-${metric.color}-500`}>
                      {metric.trend}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${metric.color}-100/10`}>
                    <metric.icon className={`h-5 w-5 text-${metric.color}-500`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.departmentStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {stats.departmentStats.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <CardTitle>Project Status by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  {
                    priority: "High",
                    won: projects.filter(p => p.priority === "high" && p.status === "won").length,
                    lost: projects.filter(p => p.priority === "high" && p.status === "lost").length,
                    pending: projects.filter(p => p.priority === "high" && !["won", "lost"].includes(p.status)).length,
                  },
                  {
                    priority: "Medium",
                    won: projects.filter(p => p.priority === "medium" && p.status === "won").length,
                    lost: projects.filter(p => p.priority === "medium" && p.status === "lost").length,
                    pending: projects.filter(p => p.priority === "medium" && !["won", "lost"].includes(p.status)).length,
                  },
                  {
                    priority: "Low",
                    won: projects.filter(p => p.priority === "low" && p.status === "won").length,
                    lost: projects.filter(p => p.priority === "low" && p.status === "lost").length,
                    pending: projects.filter(p => p.priority === "low" && !["won", "lost"].includes(p.status)).length,
                  },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priority" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="won" stackId="a" fill="#22c55e" name="Won" />
                  <Bar dataKey="lost" stackId="a" fill="#ef4444" name="Lost" />
                  <Bar dataKey="pending" stackId="a" fill="#3b82f6" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <EmployeeForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
      />

      {/* Force Password Reset Button */}
      <div className="flex justify-end">
        <Button 
          variant="destructive" 
          onClick={handleForcePasswordReset}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Force All Password Reset
        </Button>
      </div>
    </div>
    
  );
}
