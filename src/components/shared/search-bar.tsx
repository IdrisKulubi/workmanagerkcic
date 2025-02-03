"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const debouncedValue = useDebounce(searchQuery, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.push(`/projects?${params.toString()}`, { scroll: false });
    });
  }, [debouncedValue, router, searchParams]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
