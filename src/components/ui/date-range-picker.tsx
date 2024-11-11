"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";

export function DatePickerWithRange() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (dateParam) {
      const [start, end] = dateParam.split("to").map((d) => new Date(d.trim()));
      return { from: start, to: end };
    }
    return undefined;
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    const params = new URLSearchParams(searchParams);

    if (range?.from && range?.to) {
      const dateStr = `${format(range.from, "yyyy-MM-dd")} to ${format(
        range.to,
        "yyyy-MM-dd"
      )}`;
      params.set("date", dateStr);
    } else {
      params.delete("date");
    }

    router.push(`/projects/reports?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDateChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
