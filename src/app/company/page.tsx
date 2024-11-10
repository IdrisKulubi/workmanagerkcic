import { Suspense } from "react";
import { EmployeeList } from "@/components/employees/employee-list";
import { EmployeeStats } from "@/components/employees/employee-stats";
import { DepartmentFilter } from "@/components/shared/department-filter";
import { EventCalendar } from "@/components/employees/event-calender";
import { getEmployeesByDepartment } from "@/lib/actions/employees-actions";
import { getEvents } from "@/lib/actions/events-actions";
import { Navbar } from "@/components/shared/navbar";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(department: string | undefined) {
  const employees = await getEmployeesByDepartment(department);
  const eventsResponse = await getEvents();
  
  return { 
    employees, 
    eventList: eventsResponse.success ? eventsResponse.data?.map(event => ({
      id: event.id,
      title: event.opportunity,
      description: event.notes || '',
      projectTeam: event.projectTeam,
      action: event.action,
      actionDeadline: event.actionDeadline,
      submissionDeadline: event.submissionDeadline,
      weekOf: event.weekOf,
      status: event.status,
      location: '',
      startDate: new Date(event.weekOf),
      endDate: event.submissionDeadline ? new Date(event.submissionDeadline) : new Date(event.weekOf),
      startTime: '09:00',
      endTime: '17:00'
    })) : []
  };
}

interface PageProps {
  searchParams: Promise<{ department?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
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
          <Suspense fallback={
            <div className="w-full">
              <Skeleton className="h-[120px] w-full rounded-lg" />
            </div>
          }>
            <EmployeeStats />
          </Suspense>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <div>
              <DepartmentFilter />
            </div>

            <div className="space-y-6">
              <Suspense fallback={
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              }>
                <EmployeeList employees={employees} />
              </Suspense>

              <Suspense fallback={
                <Skeleton className="h-[400px] w-full rounded-lg" />
              }>
                <EventCalendar events={eventList?.map(event => ({
                  ...event,
                  status: event.status as "active" | "past" // Type assertion to match Event interface
                })) || []} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
