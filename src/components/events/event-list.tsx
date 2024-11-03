"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/lib/actions/events-actions";
import { Event } from "@/types/events";


export function EventList({ events }: { events: Event[] }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("active");

  const activeEvents = events.filter((event) => event.status === "active");
  const pastEvents = events.filter((event) => event.status === "past");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <p className="text-sm">Location: {event.location}</p>
                        <div className="text-sm mt-2">
                          <p>
                            Starts: {format(new Date(event.startDate), "PPP")}{" "}
                            at {event.startTime}
                          </p>
                          <p>
                            Ends: {format(new Date(event.endDate), "PPP")} at{" "}
                            {event.endTime}
                          </p>
                        </div>
                      </div>
                      {(user?.role === "admin" || user?.role === "manager") && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteEvent(event.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card key={event.id} className="opacity-75">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <p className="text-sm">Location: {event.location}</p>
                    <div className="text-sm mt-2">
                      <p>
                        Started: {format(new Date(event.startDate), "PPP")} at{" "}
                        {event.startTime}
                      </p>
                      <p>
                        Ended: {format(new Date(event.endDate), "PPP")} at{" "}
                        {event.endTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
