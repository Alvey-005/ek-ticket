"use client";

import React from "react";

export default function TripTypeSelector({
  value,
  onChange,
}: {
  value: "One way" | "Round trip";
  onChange: (v: "One way" | "Round trip") => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "One way" | "Round trip")}
      className="h-12 px-4 rounded-xl bg-white text-[#002B7A] focus:outline-none"
    >
      <option>One way</option>
      <option>Round trip</option>
    </select>
  );
}
