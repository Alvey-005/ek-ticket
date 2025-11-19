"use client";

import * as React from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = React.useState(false);

  // 🔥 Prevent auto-select on open
  const userInteracted = React.useRef(false);

  const airports = [
    {
      city: "Abu Dhabi",
      airport: "Abu Dhabi International Airport",
      country: "United Arab Emirates",
      code: "AUH",
    },
    {
      city: "Bangkok",
      airport: "Suvarnabhumi Airport",
      country: "Thailand",
      code: "BKK",
    },
    {
      city: "Barishal",
      airport: "Barishal Airport",
      country: "Bangladesh",
      code: "BZL",
    },
    {
      city: "Guangzhou",
      airport: "Guangzhou Baiyun International Airport",
      country: "China",
      code: "CAN",
    },

    // ---- 16 NEW ONES ----

    {
      city: "Dhaka",
      airport: "Hazrat Shahjalal International Airport",
      country: "Bangladesh",
      code: "DAC",
    },
    {
      city: "Chattogram",
      airport: "Shah Amanat International Airport",
      country: "Bangladesh",
      code: "CGP",
    },
    {
      city: "Sylhet",
      airport: "Osmani International Airport",
      country: "Bangladesh",
      code: "ZYL",
    },
    {
      city: "London",
      airport: "London Heathrow Airport",
      country: "United Kingdom",
      code: "LHR",
    },
    {
      city: "Kuala Lumpur",
      airport: "Kuala Lumpur International Airport",
      country: "Malaysia",
      code: "KUL",
    },
    {
      city: "Singapore",
      airport: "Changi Airport",
      country: "Singapore",
      code: "SIN",
    },
    {
      city: "Doha",
      airport: "Hamad International Airport",
      country: "Qatar",
      code: "DOH",
    },
    {
      city: "Dubai",
      airport: "Dubai International Airport",
      country: "United Arab Emirates",
      code: "DXB",
    },
    {
      city: "Jeddah",
      airport: "King Abdulaziz International Airport",
      country: "Saudi Arabia",
      code: "JED",
    },
    {
      city: "Riyadh",
      airport: "King Khalid International Airport",
      country: "Saudi Arabia",
      code: "RUH",
    },
    {
      city: "Istanbul",
      airport: "Istanbul Airport",
      country: "Turkey",
      code: "IST",
    },
    {
      city: "New York",
      airport: "John F. Kennedy International Airport",
      country: "United States",
      code: "JFK",
    },
    {
      city: "Toronto",
      airport: "Toronto Pearson International Airport",
      country: "Canada",
      code: "YYZ",
    },
    {
      city: "Tokyo",
      airport: "Narita International Airport",
      country: "Japan",
      code: "NRT",
    },
    {
      city: "Hong Kong",
      airport: "Hong Kong International Airport",
      country: "Hong Kong",
      code: "HKG",
    },
    {
      city: "Colombo",
      airport: "Bandaranaike International Airport",
      country: "Sri Lanka",
      code: "CMB",
    },
    {
      city: "Kathmandu",
      airport: "Tribhuvan International Airport",
      country: "Nepal",
      code: "KTM",
    },
  ];

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        userInteracted.current = false; // reset on open
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "h-12 w-full justify-between rounded-xl border border-gray-200 bg-white px-4 text-left",
            className
          )}
        >
          <span className="text-[10px] text-gray-500 mr-2">{label}:</span>

          {/* FIXED FONT SIZE */}
          <span className="text-sm text-[#002B7A] font-medium">
            {value ? value : "City or station"}
          </span>

          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0 rounded-xl">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} className="text-sm" />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {airports.map((place) => (
                <CommandItem
                  key={place.code}
                  value={place.city} // ← MUST be a string
                  // detect real interaction
                  onMouseDown={() => (userInteracted.current = true)}
                  onKeyDown={() => (userInteracted.current = true)}
                  onSelect={(selected) => {
                    if (!userInteracted.current) return; // stop auto-select
                    onChange(selected);
                    setOpen(false);
                    userInteracted.current = false;
                  }}
                  className={cn(
                    "cursor-pointer py-2 px-2 flex items-center gap-2",
                    "hover:bg-gray-50"
                  )}
                >
                  <Check
                    className={cn("h-4 w-4", value === place.city ? "opacity-100" : "opacity-0")}
                  />

                  <div className="flex flex-col w-full">
                    {/* Row 1: City + Code (nicely spaced, not edge-to-edge) */}
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="text-base font-semibold text-gray-900">{place.city}</span>

                      <span className="text-sm font-bold text-[#002B7A]">{place.code}</span>
                    </div>

                    {/* Row 2: Country */}
                    <span className="text-xs text-gray-500 mt-0.5">{place.country}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
