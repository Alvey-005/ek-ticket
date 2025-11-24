"use client";

import React, { useState } from "react";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import type { PassengerCounts } from "./SearchBar";

export default function PassengerSelector({
  value,
  onChange,
  label,
  className,
}: {
  value: PassengerCounts;
  onChange: (v: PassengerCounts) => void;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof PassengerCounts, delta: number) => {
 
    const next = { ...value };

    // rule: infants ≤ adults
    if (key === "infants" && delta > 0) {
      if (value.infants >= value.adults) return; // stop adding
    }

    next[key] = Math.max(0, value[key] + delta);

    // rule: if adult decreases, cap infants
    if (key === "adults" && delta < 0) {
      next.infants = Math.min(next.infants, next.adults);
    }

    onChange(next);
  };

  return (
    <div className={["relative", className || ""].join(" ")}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-12 w-full flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-left"
      >
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-[#002B7A]">{label}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3">
          {/* Adults */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Adults</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update("adults", -1)}
                className="p-1 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center">{value.adults}</span>
              <button
                type="button"
                onClick={() => update("adults", 1)}
                className="p-1 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Children</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update("children", -1)}
                className="p-1 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center">{value.children}</span>
              <button
                type="button"
                onClick={() => update("children", 1)}
                className="p-1 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Infants</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update("infants", -1)}
                className="p-1 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-6 text-center">{value.infants}</span>

              <button
                type="button"
                onClick={() => update("infants", 1)}
                disabled={value.infants >= value.adults}
                className={`p-1 rounded-md border border-gray-200 hover:bg-gray-100 ${
                  value.infants >= value.adults ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-100 text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
