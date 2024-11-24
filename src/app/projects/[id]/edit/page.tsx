import { ProjectForm } from "@/components/projects/project-form";
import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/lib/actions/project-actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Project",
  description: "Edit project details",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const user = await getCurrentUser();
  const { data: project } = await getProjectById(resolvedParams.id);

  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    redirect("/projects");
  }

  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
