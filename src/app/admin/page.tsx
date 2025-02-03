import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getDonorStats } from "@/lib/actions/admin-actions";
import { DonorShowcase } from "@/components/admin/donor-showcase";
import { getAllProjects } from "@/lib/actions/project-actions";


export default async function AdminPage() {
  const user = await getCurrentUser();
  const { data: projects } = await getAllProjects();

  if (!user || user.role?.toLowerCase() !== "admin") {
    redirect("/");
  }

  const donorStats = await getDonorStats();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>
      <AdminDashboard projects={projects ?? []} />
      <DonorShowcase donors={donorStats} />
    </div>
  );
} 