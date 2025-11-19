"use client";

import React from "react";
import { ArrowLeftRight } from "lucide-react";

export default function SwapButton({ onSwap }: { onSwap: () => void }) {
  return (
    <button
      type="button"
      onClick={onSwap}
      className="
        h-12 w-12 
        flex items-center justify-center
        rounded-full 
        border border-gray-200 
        bg-white 
        text-gray-700 
        hover:bg-gray-100
        shadow-sm
      "
      aria-label="Swap locations"
    >
      <ArrowLeftRight className="w-5 h-5" />
    </button>
  );
}
