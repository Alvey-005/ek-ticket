"use client";

import * as React from "react";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "h-12 w-full rounded-xl bg-white px-4 flex items-center justify-between text-left",

            )}
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-[15px] text-[#002B7A] font-medium">
                {value ? format(value, "EEE, MMM d") : "Select date"}
              </span>
            </div>

            <CalendarIcon className="w-4 h-4 text-gray-400" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 rounded-xl shadow-lg">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (date) {
                onChange(date);
                setOpen(false); // close after selecting
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
