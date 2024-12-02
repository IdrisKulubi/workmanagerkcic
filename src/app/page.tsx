import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getProjects } from "@/lib/actions/project-actions";
import { HomeClient } from "@/components/home/home-client";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white">
      <div className="sticky top-0 z-50 border-b bg-white/10 backdrop-blur-md">
        <Navbar />
      </div>

      <HomeClient projects={projects} />

      <Footer />
    </div>
  );
}
