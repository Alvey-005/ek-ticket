"use client";

import React from "react";

export default function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 px-6 rounded-xl bg-orange-400 text-white font-medium"
    >
      Search
    </button>
  );
}
