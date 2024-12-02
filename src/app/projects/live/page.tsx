import { Suspense } from "react";
import { getAllProjects } from "@/lib/actions/project-actions";
import { Navbar } from "@/components/shared/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Radio } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { LiveProjectsGrid } from "@/components/projects/live-project/live-projects-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LiveProjectsPage() {
  const { data: projects } = await getAllProjects();
  const currentUser = await getCurrentUser();
  const liveProjects = projects?.filter((p) => p.isLive) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-8">
          <Radio className="h-6 w-6 text-primary animate-pulse" />
          <h1 className="text-3xl font-bold">Live BD  Dashboard</h1>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-6 w-16" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <Skeleton className="h-16 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <LiveProjectsGrid projects={liveProjects} userRole={currentUser?.role} />
        </Suspense>
      </div>
    </div>
  );
}
