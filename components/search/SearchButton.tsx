

"use client";

import React from "react";

export default function SearchButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 px-6 rounded-xl bg-orange-400 text-white font-medium ${className}`}
    >
      Search
    </button>
  );
}

