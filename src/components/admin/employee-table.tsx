"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { User } from "../../../db/schema";
import { deleteEmployee } from "@/lib/actions/admin-actions";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { EmployeeForm } from "./employee-form";
import { Badge } from "@/components/ui/badge";

interface EmployeeTableProps {
  employees: User[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Failed to delete employee",
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'ceo':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'admin':
        return 'bg-red-500 hover:bg-red-600';
      case 'manager':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-green-500 hover:bg-green-600';
    }
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'PSD': 'text-blue-600 dark:text-blue-400',
      'Finance': 'text-green-600 dark:text-green-400',
      'HR': 'text-purple-600 dark:text-purple-400',
      'IT': 'text-orange-600 dark:text-orange-400',
      'Marketing': 'text-pink-600 dark:text-pink-400',
      'Operations': 'text-cyan-600 dark:text-cyan-400',
      'Sales': 'text-yellow-600 dark:text-yellow-400',
    };
    return colors[department] || 'text-gray-600 dark:text-gray-400';
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {employees.map((employee) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="hover:bg-muted/50 group"
                >
                  <TableCell>
                    <div className="font-medium">{employee.name}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {employee.email}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getDepartmentColor(employee.department)}`}>
                      {employee.department}
                    </span>
                  </TableCell>
                  <TableCell className="italic text-muted-foreground">
                    {employee.title}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getRoleBadgeColor(employee.role)}`}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowForm(true);
                        }}
                        className="hover:text-blue-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(employee.id)}
                        className="hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <EmployeeForm
        employee={selectedEmployee}
        open={showForm}
        onOpenChange={setShowForm}
      />
    </>
  );
} 