import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";

import { Skeleton } from "@/components/ui/skeleton";
import { getAllProjects } from "@/lib/actions/project-actions";
import { CompanyStatsFilters } from "@/components/company-stats/company-stats-filters";
import { CompanyStats } from "@/components/company-stats/company-stats";

export default async function StatsPage() {
  const { data: projects } = await getAllProjects();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>

      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-3xl font-bold">Company Statistics</h1>
            <Suspense fallback={<div>Loading...</div>}>
              <CompanyStatsFilters projects={projects ?? []} />
            </Suspense>
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
            <CompanyStats projects={projects ?? []} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
