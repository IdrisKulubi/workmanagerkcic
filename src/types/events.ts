export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  status: "active" | "past";
}; 