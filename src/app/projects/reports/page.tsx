import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProjects } from "@/lib/actions/project-actions";
import { ReportsFilters } from "@/components/reports/reports-filters";
import { ReportsList } from "@/components/reports/reports-list";


export default async function ReportsPage() {
  const { data: projects } = await getAllProjects();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>

      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-3xl font-bold">Project Reports</h1>
            <ReportsFilters projects={projects ?? []} />
          </div>

          <Suspense
            fallback={
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-[400px]" />
                ))}
              </div>
            }
          >
            <ReportsList projects={projects ?? []} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
