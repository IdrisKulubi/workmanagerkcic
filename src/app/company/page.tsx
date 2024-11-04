import { Suspense } from "react";
import { EmployeeList } from "@/components/employees/employee-list";
import { EmployeeStats } from "@/components/employees/employee-stats";
import { DepartmentFilter } from "@/components/shared/department-filter";
import { EventCalendar } from "@/components/employees/event-calender";
import { getEmployeesByDepartment } from "@/lib/actions/employees-actions";
import { Navbar } from "@/components/shared/navbar";
import db from "../../../db/drizzle";
import { events } from "../../../db/schema";
import { desc } from "drizzle-orm";

async function getData(department: string | undefined) {
  const employees = await getEmployeesByDepartment(department);
  const eventList = await db.select().from(events).orderBy(desc(events.startDate));
  
  return { 
    employees, 
    eventList: eventList.map(event => ({
      ...event,
      description: event.description ?? '',
      location: event.location ?? '',
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      status: event.status as "active" | "past"
    }))
  };
}

interface PageProps {
  searchParams: Promise<{ department?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  // Await the searchParams
  const params = await searchParams;
  const department = params.department;
  
  const { employees, eventList } = await getData(department);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      <div className="container mx-auto py-8">
        <div className="grid gap-6">
          <Suspense fallback={<div>Loading stats...</div>}>
            <EmployeeStats />
          </Suspense>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <div>
              <DepartmentFilter />
            </div>

            <div className="space-y-6">
              <Suspense fallback={<div>Loading employees...</div>}>
                <EmployeeList employees={employees} />
              </Suspense>

              <Suspense fallback={<div>Loading events...</div>}>
                <EventCalendar events={eventList} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
