import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, isWithinInterval, parse, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWithinDateRange(date: Date | string, range: string): boolean {
  if (!date) return false;
  
  const [start, end] = range.split('to').map(d => parse(d.trim(), 'yyyy-MM-dd', new Date()));
  const targetDate = typeof date === 'string' ? parseISO(date) : date;
  
  return isWithinInterval(targetDate, { start, end: addDays(end, 1) });
}

export function isWithinBudgetRange(budget: number, range: string): boolean {
  if (!budget) return false;
  
  if (range === "1000000+") {
    return budget >= 1000000;
  }

  const [min, max] = range.split("-").map(Number);
  return budget >= min && budget <= max;
}
