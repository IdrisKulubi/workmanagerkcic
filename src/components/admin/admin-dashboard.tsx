/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CompanyStats } from "./company-stats";
import { EmployeeTable } from "./employee-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "../../../db/schema";
import { EmployeeForm } from "./employee-form";
import { getEmployeeStats, forceAllPasswordReset } from "@/lib/actions/admin-actions";
import { Users, UserPlus, Briefcase, Award, Shield } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

export function AdminDashboard() {
  const [employees, setEmployees] = useState<User[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const {toast} = useToast();
  const [stats, setStats] = useState<{
    totalEmployees: number;
    departmentStats: { department: string; count: number }[];
    roleDistribution: { role: string; count: number }[];
  }>({
    totalEmployees: 0,
    departmentStats: [],
    roleDistribution: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getEmployeeStats();
      setStats(data  );
    };
    fetchStats();
  }, []);

  const handleAddSuccess = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const getStatTrend = (title: string) => {
    // Mock trends - in real app, calculate from historical data
    const trends: Record<string, { trend: 'up' | 'down' | 'stable', percentage: number }> = {
      'Total Employees': { trend: 'up', percentage: 12 },
      'Departments': { trend: 'stable', percentage: 0 },
      'Roles': { trend: 'up', percentage: 5 },
    };
    return trends[title] || { trend: 'stable', percentage: 0 };
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const statsCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Departments",
      value: stats.departmentStats.length,
      icon: Briefcase,
      color: "text-green-500",
    },
    {
      title: "Roles",
      value: stats.roleDistribution.length,
      icon: Award,
      color: "text-purple-500",
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
        description: "Failed to force password reset",
      });
    }
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <motion.h1 
          className="text-4xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            onClick={() => setShowAddForm(true)}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-muted/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <div className={`text-sm ${getTrendColor(getStatTrend(stat.title).trend)}`}>
                      {getStatTrend(stat.title).trend === 'up' && '↑'}
                      {getStatTrend(stat.title).trend === 'down' && '↓'}
                      {getStatTrend(stat.title).percentage}%
                    </div>
                  </div>
                  <div className={`p-4 rounded-full ${stat.color.replace('text', 'bg')}/10`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CompanyStats employees={employees} />
      </motion.div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-lg shadow"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Employee Management</h2>
          <EmployeeTable employees={employees} />
        </div>
      </motion.div>

      {/* Add Employee Form */}
      <EmployeeForm
        open={showAddForm}
        onOpenChange={(open) => {
          setShowAddForm(open);
          if (!open) handleAddSuccess();
        }}
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