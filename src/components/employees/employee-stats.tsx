"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { animate } from "framer-motion";
import { getTotalEmployees } from "@/lib/actions/employees-actions";

export function EmployeeStats() {
  const [count, setCount] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    async function fetchTotalEmployees() {
      const total = await getTotalEmployees();
      setTotalEmployees(total);
    }
    fetchTotalEmployees();
  }, []);

  useEffect(() => {
    const controls = animate(0, totalEmployees, {
      duration: 2,
      onUpdate: (value) => setCount(Math.floor(value)),
    });

    return () => controls.stop();
  }, [totalEmployees]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}
