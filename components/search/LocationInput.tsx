"use client";

import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function LocationInput({
  label,
  value,
  onChange,
  className,
}: {
  label: "From" | "To";
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const suggestions = ["Dhaka", "London", "Cox’s Bazar", "Chittagong"];

  return (
    <Popover>
      {/* Trigger is the input container */}
      <PopoverTrigger asChild>
        <div
          className={[
            "h-12 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 cursor-pointer",
            className || "",
          ].join(" ")}
        >
          <span className="text-xs text-gray-500">{label}:</span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="City or station"
            className="w-full bg-transparent text-lg text-[#002B7A] placeholder:text-gray-400 focus:outline-none cursor-pointer"
          />
        </div>
      </PopoverTrigger>

      {/* Popover dropdown */}
      <PopoverContent
        align="start"
        className="w-[250px] p-2 rounded-xl border bg-white shadow-lg"
      >
        <div className="flex flex-col gap-1">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => onChange(item)}
              className="text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
