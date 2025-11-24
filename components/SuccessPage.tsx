"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg w-full rounded-[30px] bg-white shadow-2xl px-10 py-20 mx-auto">
      {/* Blue Check Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#002B7A] rounded-full flex items-center justify-center">
          <Check className="text-white w-8 h-8" />
        </div>
      </div>

      {/* Title (NOT bold) */}
      <h2 className="text-2xl text-center text-[#002B7A] leading-snug">Account Created</h2>
      <h2 className="text-2xl text-center text-[#002B7A] leading-snug">Successfully</h2>

      {/* Description */}
      <p className="text-gray-600 mt-3 text-base leading-none text-center px-6">
        Your NRB Connect account has been created. You can now log in and access citizen services,
        jobs, and more.
      </p>

      {/* Log In Button */}
      <button
        onClick={() => router.push("/login")}
        className="mt-8 w-full bg-[#FF9101] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
      >
        Log In
      </button>
    </div>
  );
}
