"use client";

import * as React from "react";
import { sub, format, isAfter } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const today = new Date();
const sevenDaysAgo = sub(today, { days: 1 });

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: sevenDaysAgo,
    to: today,
  });

  function handleSelect(value: DateRange | undefined) {
    const rangeEnd = isAfter(value?.to ?? today, today) ? today : value?.to;
    const updatedRange = { from: value?.from, to: rangeEnd };
    setDate(updatedRange);
    onDateChange(updatedRange);
  }

  const calendarMatcher: Matcher = (day: Date) => {
    return isAfter(day, sevenDaysAgo);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
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
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            disabled={calendarMatcher}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            showOutsideDays={true}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
