import { Suspense } from "react";
import { EmployeeList } from "@/components/employees/employee-list";
import { EmployeeStats } from "@/components/employees/employee-stats";
import { DepartmentFilter } from "@/components/shared/department-filter";
import { EventCalendar } from "@/components/employees/event-calender";

import { Navbar } from "@/components/shared/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyPageData } from "@/lib/actions/company-actions";

// Move the data fetching to a separate server action

type CompanyPageProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ department?: string }>;
};

export default async function CompanyPage({ searchParams }: CompanyPageProps) {
  const params = await searchParams;
  const { employees, eventList } = await getCompanyPageData(params.department);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="container mx-auto py-8">
        <div className="grid gap-6">
          <Suspense
            fallback={
              <div className="w-full">
                <Skeleton className="h-[120px] w-full rounded-lg" />
              </div>
            }
          >
            <EmployeeStats />
          </Suspense>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <div>
              <DepartmentFilter />
            </div>

            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                  </div>
                }
              >
                <EmployeeList employees={employees} />
              </Suspense>

              <Suspense
                fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}
              >
                <EventCalendar
                  events={
                    eventList?.map((event) => ({
                      ...event,
                      status: event.status as "active" | "past",
                    })) || []
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
