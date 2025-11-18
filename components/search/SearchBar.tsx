"use client";

import React, { useMemo, useState } from "react";
import TripTypeSelector from "./TripTypeSelector";
import LocationInput from "./LocationInput";
import SwapButton from "./SwapButton";
import DatePicker from "./DatePicker";
import ReturnDatePicker from "./ReturnDatePicker";
import PassengerSelector from "./PassengerSelector";
import SearchButton from "./SearchButton";

export type PassengerCounts = {
  adults: number;
  children: number;
};

export type SearchPayload = {
  tripType: "One way" | "Round trip";
  from: string;
  to: string;
  departDate: Date;
  returnDate?: Date | null;
  passengers: PassengerCounts;
};

function formatDisplay(counts: PassengerCounts) {
  const total = counts.adults + counts.children;
  return `${total} People Onboard`;
}

export default function SearchBar({
  className,
  onSearch,
}: {
  className?: string;
  onSearch: (payload: SearchPayload) => void;
}) {
  const [tripType, setTripType] = useState<"One way" | "Round trip">("One way");
  const [from, setFrom] = useState("Dhaka");
  const [to, setTo] = useState("London");
  const [departDate, setDepartDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 2,
    children: 0,
  });

  const passengerLabel = useMemo(() => formatDisplay(passengers), [passengers]);

  const handleSwap = () => {
    setFrom((prevFrom) => {
      const prevTo = to;
      setTo(prevFrom);
      return prevTo;
    });
  };

  const handleSearch = () =>
    onSearch({ tripType, from, to, departDate, returnDate, passengers });

  return (
    <div
      className={[
        "bg-white rounded-3xl border border-gray-200",
        "px-4 sm:px-5 md:px-6 py-4",
        className || "",
      ].join(" ")}
    >
      {/* ---------- ROW 1: Trip Type ---------- */}
      <div className="mb-3">
        <TripTypeSelector value={tripType} onChange={setTripType} />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex flex-1 items-center min-w-[300px]">
          {/* FROM input */}
          <div className="flex-1 pr-4">
            <LocationInput
              label="From"
              value={from}
              onChange={setFrom}
              className="w-full"
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 z-20">
            <SwapButton onSwap={handleSwap} />
          </div>

          {/* TO input */}
          <div className="flex-1 pl-4">
            <LocationInput
              label="To"
              value={to}
              onChange={setTo}
              className="w-full"
            />
          </div>
        </div>

        {/* === DATE + RETURN IN SAME CONTAINER === */}
        <div className="flex flex-1 h-12 items-center rounded-xl border border-gray-300 bg-white min-w-[300px]">
          {/* LEFT SIDE — DATE PICKER */}
          <div className="flex-1 h-full flex items-center px-4">
            <DatePicker
              label="Date"
              value={departDate}
              onChange={setDepartDate}
              className="w-full"
            />
          </div>

          {/* DIVIDER */}
          <div className="h-6 border-l border-dashed border-gray-300 mx-2"></div>

          {/* RIGHT SIDE — RETURN OR ADD RETURN */}
          <div className="flex-1 h-full flex items-center px-4">
            {tripType === "Round trip" ? (
              <ReturnDatePicker
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
                className="w-full"
              />
            ) : (
              <button
                onClick={() => setTripType("Round trip")}
                className="text-sm text-gray-600 hover:text-gray-800 w-full text-left"
              >
                Add return +
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 min-w-[260px]">
          <PassengerSelector
            value={passengers}
            onChange={setPassengers}
            label={passengerLabel}
            className="flex-1"
          />

          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
}
