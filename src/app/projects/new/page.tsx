import { ProjectForm } from "@/components/projects/project-form";
import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewProjectPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    redirect("/projects");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
        <ProjectForm />
      </div>
    </div>
  );
}
