"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/auth-provider";
import { AddEventDialog } from "./add-event-dialog";
import { EventList } from "./event-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvents } from "@/lib/actions/events-actions";
import { Event } from "@/types/events";


export function EventCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data as unknown as Event[]);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {(user?.role === "admin" || user?.role === "manager") && (
        <div className="flex justify-end">
          <AddEventDialog />
        </div>
      )}
      <EventList events={events} />
    </div>
  );
}
