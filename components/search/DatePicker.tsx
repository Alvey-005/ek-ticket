"use client";

import * as React from "react";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DatePicker({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  // ⬅️ Go to previous day
  const goPrevDay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(subDays(value, 1));
  };

  // ➡️ Go to next day
  const goNextDay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(addDays(value, 1));
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="h-12 w-full rounded-xl bg-white px-4 flex items-center justify-between"
          >
            <span className="text-[15px] text-[#002B7A] font-medium">
              {format(value, "EEE, MMM d")}
            </span>

            {/* Prev/Next Day Buttons */}
            <div className="flex items-center gap-1">
              <ChevronLeft
                className="w-4 h-4 text-gray-500 cursor-pointer hover:text-black"
                onClick={goPrevDay}
              />
              <ChevronRight
                className="w-4 h-4 text-gray-500 cursor-pointer hover:text-black"
                onClick={goNextDay}
              />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 rounded-xl shadow-lg">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (date) {
                onChange(date);
                setOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
