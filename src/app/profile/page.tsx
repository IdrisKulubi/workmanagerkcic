import { Navbar } from "@/components/shared/navbar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ProfileForm } from "@/components/profile/profile-form";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile and password",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        <ProfileForm user={user} />
      </div>
    </div>
  );
} 