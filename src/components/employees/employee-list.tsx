'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth/auth-provider'
import { deleteEmployee } from '@/lib/actions/employees-actions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EmployeeList({ employees }: { employees: any[] }) {
  const { user } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(employees.length)
    }, 100)
    return () => clearTimeout(timer)
  }, [employees.length])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {count}
          </motion.span>{' '}
          Employees
        </motion.div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Email</TableHead>
            {user?.role === 'admin' && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.title}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.email}</TableCell>
              {user?.role === 'admin' && (
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
