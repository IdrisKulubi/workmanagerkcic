import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="flex-1">
        <section className="py-20 sm:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Welcome to KCIC Project Manager
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your consulting projects with our comprehensive
                  management system.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/company">
                  <Button size="lg">Company Details</Button>
                </Link>
              
                <Link href="/analytics">
                  <Button size="lg">Company Analytics</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40 py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <h2 className="text-xl font-bold">Project Tracking</h2>
                <p className="text-center text-muted-foreground">
                  Monitor all your consulting projects in real-time
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <h2 className="text-xl font-bold">Team Collaboration</h2>
                <p className="text-center text-muted-foreground">
                  Work seamlessly with your team members
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                <h2 className="text-xl font-bold">Detailed Analytics</h2>
                <p className="text-center text-muted-foreground">
                  Get insights into project performance
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
