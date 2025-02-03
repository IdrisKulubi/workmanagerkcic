"use server";

import { getEmployeesByDepartment } from "./employees-actions";
import { getEvents } from "./events-actions";

export async function getCompanyPageData(department: string | undefined) {
  const employees = await getEmployeesByDepartment(department);
  const eventsResponse = await getEvents();

  return {
    employees,
    eventList: eventsResponse.success
      ? eventsResponse.data?.map((event) => ({
          id: event.id,
          title: event.opportunity,
          description: event.notes || "",
          projectTeam: event.projectTeam,
          action: event.action,
          actionDeadline: event.actionDeadline,
          submissionDeadline: event.submissionDeadline,
          weekOf: event.weekOf,
          status: event.status,
          location: "",
          startDate: new Date(event.weekOf),
          endDate: event.submissionDeadline
            ? new Date(event.submissionDeadline)
            : new Date(event.weekOf),
          startTime: "09:00",
          endTime: "17:00",
        }))
      : [],
  };
}
