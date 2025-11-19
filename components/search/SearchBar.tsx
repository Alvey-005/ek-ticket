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

// ------------------ HELPERS ------------------

const cityToIata = (city: string) => {
  const map: Record<string, string> = {
    Dhaka: "DAC",
    Chattogram: "CGP",
    Sylhet: "ZYL",
    "Cox’s Bazar": "CXB",
    Barishal: "BZL",
    Jessore: "JSR",
    Rajshahi: "RJH",
    Saidpur: "SPD",
    Bogura: "BAZ",
    Ishurdi: "IRD",
    Comilla: "CLA",
    Tangail: "TGL",
    Shamshernagar: "ZHM",
    Thakurgaon: "TKR",
  };

  return map[city] || city;
};

const formatDateForBiman = (date: Date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
};

// Generate UUID for execution parameter
const generateExecutionId = () => crypto.randomUUID();

function formatDisplay(counts: PassengerCounts) {
  const total = counts.adults + counts.children;
  return `${total} People Onboard`;
}

// ------------------ COMPONENT ------------------

export default function SearchBar({
  className,
  onSearch,
}: {
  className?: string;
  onSearch: (payload: SearchPayload) => void;
}) {
  const [tripType, setTripType] = useState<"One way" | "Round trip">("One way");
  const [from, setFrom] = useState("Dhaka");
  const [to, setTo] = useState("Barishal");
  const [departDate, setDepartDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 2,
    children: 0,
  });

  const passengerLabel = useMemo(() => formatDisplay(passengers), [passengers]);

  // ------------------ SWAP ------------------

  const handleSwap = () => {
    setFrom((prevFrom) => {
      const prevTo = to;
      setTo(prevFrom);
      return prevTo;
    });
  };

  // ------------------ SEARCH WITH URL ------------------

  const handleSearch = () => {
    const journeyType = tripType === "One way" ? "one-way" : "round-trip";

    const origin = cityToIata(from);
    const destination = cityToIata(to);

    const depart = formatDateForBiman(departDate);
    const ret = returnDate ? formatDateForBiman(returnDate) : "";

    const ADT = passengers.adults;
    const C11 = passengers.children;
    const INF = 0;

    // Generate execution ID
    const execution = generateExecutionId();

    let url = "";

    if (tripType === "One way") {
      url =
        `https://booking.biman-airlines.com/dx/BGDX/#/flight-selection` +
        `?journeyType=one-way` +
        `&pointOfSale=BD` +
        `&locale=en-US` +
        `&awardBooking=false` +
        `&searchType=BRANDED` +
        `&class=Economy` +
        `&ADT=${ADT}` +
        `&C11=${C11}` +
        `&INF=${INF}` +
        `&origin=${origin}` +
        `&destination=${destination}` +
        `&date=${depart}` +
        `&promoCode=` +
        `&direction=0` +
        `&activeMonth=${depart}` +
        `&execution=${execution}`;
    } else {
      url =
        `https://booking.biman-airlines.com/dx/BGDX/#/flight-selection` +
        `?journeyType=round-trip` +
        `&locale=en-US` +
        `&ADT=${ADT}` +
        `&C11=${C11}` +
        `&INF=${INF}` +
        `&origin=${origin}` +
        `&destination=${destination}` +
        `&date=${depart}` +
        `&date1=${ret}` +
        `&origin1=${destination}` +
        `&destination1=${origin}` +
        `&promoCode=` +
        `&class=Economy` +
        `&pointOfSale=BD` +
        `&execution=${execution}`;
    }

    // Open Biman URL
    window.open(url, "_blank");

    // Send payload upward (optional)
    onSearch({
      tripType,
      from,
      to,
      departDate,
      returnDate,
      passengers,
    });
  };

  // ------------------ UI ------------------

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
        {/* FROM + SWAP + TO */}
        <div className="relative flex flex-1 items-center min-w-[300px]">
          <div className="flex-1 pr-4">
            <LocationInput label="From" value={from} onChange={setFrom} className="w-full" />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 z-20">
            <SwapButton onSwap={handleSwap} />
          </div>

          <div className="flex-1 pl-4">
            <LocationInput label="To" value={to} onChange={setTo} className="w-full" />
          </div>
        </div>

        {/* DATE + RETURN */}
        <div className="flex flex-1 h-12 items-center rounded-xl border border-gray-300 bg-white overflow-hidden">
          <div className="flex-1 h-full flex items-center pl-4">
            <DatePicker
              label="Date"
              value={departDate}
              onChange={setDepartDate}
              className="w-full"
            />
          </div>

          <div className="h-8 border-l border-gray-300"></div>

          <div className="flex-1 h-full flex items-center pl-4">
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
                className="text-sm text-gray-600 hover:text-gray-800 text-left"
              >
                Add return +
              </button>
            )}
          </div>
        </div>

        {/* PASSENGERS + SEARCH */}
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
