"use client";

import React from "react";
import DatePicker from "./DatePicker";

export default function ReturnDatePicker({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <DatePicker label={label} value={value || new Date()} onChange={(d) => onChange(d)} />
    </div>
  );
}