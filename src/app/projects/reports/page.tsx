import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { getAllProjects } from "@/lib/actions/project-actions";
import { ReportsFilters } from "@/components/reports/reports-filters";
import { ReportsList } from "@/components/reports/reports-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ReportsPage() {
  const { data: projects } = await getAllProjects();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>

      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/projects">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Project Reports</h1>
            </div>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col gap-8">
              <ReportsFilters projects={projects ?? []} />
              <ReportsList projects={projects ?? []} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
