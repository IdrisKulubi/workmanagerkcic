import { Suspense } from "react";
import { getAllProjects } from "@/lib/actions/project-actions";
import { Navbar } from "@/components/shared/navbar";
import { ProjectGrid } from "@/components/projects/project-grid";
import { FilterMenu } from "@/components/projects/filter-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from "@/components/shared/search-bar";
import { BidManagersList } from "@/components/projects/bid-managers-list";
import { Button } from "@/components/ui/button";
import { BarChart2, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

async function getData() {
  const projectsResponse = await getAllProjects();
  return {
    projects: projectsResponse.success ? projectsResponse.data : [],
  };
}

export default async function ProjectsPage() {
  const { projects } = await getData();

  // Get unique bid managers and directors
  const bidManagers = [...new Set(projects?.map((p) => p.bidManager))];
  //   const bidDirectors = [...new Set(projects?.map(p => p.bidDirector))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Overview</h1>
            <BidManagersList
              bidManagers={bidManagers ?? []}
              projects={projects ?? []}
            />
            <Link href="/projects/stats">
              <Button variant="ghost" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                Company Stats
              </Button>
            </Link>
            <Link href="/projects/reports">
              <Button variant="ghost" className="gap-2">
                <FileText className="h-4 w-4" />
                Reports
              </Button>
            </Link>
            <Link href="/projects/forecasts">
              <Button variant="ghost" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Forecasts
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <FilterMenu />
            </Suspense>
            <Suspense fallback={<div>Loading search...</div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[200px] rounded-xl" />
              ))}
            </div>
          }
        >
          <ProjectGrid projects={projects ?? []} />
        </Suspense>
      </div>
    </div>
  );
}
