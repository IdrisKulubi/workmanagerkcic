import { Suspense } from "react";
import { getAllProjects } from "@/lib/actions/project-actions";
import { Navbar } from "@/components/shared/navbar";
import { FilterMenu } from "@/components/projects/filter-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from "@/components/shared/search-bar";
import { BidManagersList } from "@/components/projects/bid-managers-list";
import { Button } from "@/components/ui/button";
import { BarChart2, FileText, TrendingUp, Plus, Radio, Info } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { ProjectsTable } from "./projects-table";
import { ProjectStats } from "./project-stats";

// Add color coding legend
const statusColors = [
  { status: "Near Deadline", color: "bg-red-500/10", textColor: "text-red-500", description: "Projects due within 7 days" },
  { status: "Won", color: "bg-green-500/10", textColor: "text-green-500", description: "Successfully won projects" },
  { status: "In Progress", color: "bg-blue-500/10", textColor: "text-blue-500", description: "Active bids" },
  { status: "Lost", color: "bg-gray-500/10", textColor: "text-gray-500", description: "Unsuccessful bids" },
];

async function getData() {
  const projectsResponse = await getAllProjects();
  return {
    projects: projectsResponse.success ? projectsResponse.data : [],
  };
}

export default async function ProjectsPage() {
  const { projects } = await getData();
  const currentUser = await getCurrentUser();
  const bidManagers = [...new Set(projects?.map((p) => p.bidManager))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Bd Overview</h1>
            <BidManagersList
              bidManagers={bidManagers ?? []}
              projects={projects ?? []}
            />
            <Link href="/projects/stats">
              <Button variant="ghost" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                Detailed Stats
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
            <Link href="/projects/live">
              <Button variant="ghost" className="gap-2">
                <Radio className="h-4 w-4 text-green-500" />
                Live Bds
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
        {/* Color Code Legend */}
        <div className="mb-6 p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4" />
            <h3 className="font-semibold">Color Code Guide</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statusColors.map((status) => (
              <div
                key={status.status}
                className={`${status.color} p-3 rounded-lg flex items-center gap-3 transition-transform hover:scale-105`}
              >
                <div className={`${status.textColor} font-medium`}>{status.status}</div>
                <span className="text-sm text-muted-foreground">{status.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-12">
          {/* Left side - Table */}
          <div className="col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Bds List</h2>
              {(currentUser?.role === "admin" || currentUser?.role === "manager") && (
                <Link href="/projects/new">
                  <Button className="gap-2 bg-primary">
                    <Plus className="h-4 w-4" />
                    New Bd
                  </Button>
                </Link>
              )}
            </div>
            <Suspense
              fallback={
                <Skeleton className="w-full h-[500px] rounded-lg" />
              }
            >
              <ProjectsTable projects={projects ?? []} currentUser={currentUser ?? { id: "", email: "", name: "", role: "" }} />
            </Suspense>
          </div>

          {/* Right side - Stats */}
          <div className="col-span-4">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="w-full h-[200px] rounded-lg" />
                  <Skeleton className="w-full h-[200px] rounded-lg" />
                </div>
              }
            >
              <ProjectStats projects={projects ?? []} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
