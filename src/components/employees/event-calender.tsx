"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventList } from "@/components/events/event-list";
import { AddEventDialog } from "@/components/events/add-event-dialog";
import { Event } from "@/types/events";

export function EventCalendar({ events }: { events: Event[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Events</CardTitle>
        <AddEventDialog />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </TabsContent>
          <TabsContent value="list">
            <EventList events={events} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
