"use client";

import React from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function DatePicker({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: Date;
  onChange: (d: Date) => void;
  className?: string;
}) {
  return (
    <div
      className={["flex items-center gap-2 w-full", className || ""].join(" ")}
    >
      <button
        type="button"
        onClick={() => onChange(addDays(value, -1))}
        className="p-1 rounded-md hover:bg-gray-100 text-gray-700"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-sm font-medium text-[#002B7A]">
        {formatDate(value)}
      </span>
      <button
        type="button"
        onClick={() => onChange(addDays(value, 1))}
        className="p-1 rounded-md hover:bg-gray-100 text-gray-700"
        aria-label="Next day"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
