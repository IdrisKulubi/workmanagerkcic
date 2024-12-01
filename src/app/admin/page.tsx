import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "KCIC Admin Dashboard",
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  

  if (!user || user.role?.toLowerCase() !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>
      <AdminDashboard />
    </div>
  );
} 