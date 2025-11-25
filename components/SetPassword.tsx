"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function SetPassword({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!password || !confirm) {
      setError("Both fields are required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    onSuccess();
  };

  return (
    <div className="max-w-xl w-full rounded-[30px] bg-white shadow-2xl px-15 py-20 mx-auto">
      {/* Title */}
      <h2 className="text-4xl font-kadwa font-bold text-[#002B7A] leading-tight">Set Your</h2>
      <h2 className="text-4xl font-kadwa font-bold text-[#FF9101] -mt-1">Password</h2>

      {/* Subtitle */}
      <p className="text-gray-600 mt-4 text-xl leading-tight">
        Create A Secure Password <br /> For Your Account
      </p>

      {/* Password Input */}
      <div className="relative mt-10">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002B7A] w-5 h-5" />
        <input
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-lg text-[#002B7A] text-base"
        />
      </div>

      {/* Confirm Password */}
      <div className="relative mt-4">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002B7A] w-5 h-5" />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-lg text-[#002B7A] text-base"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

      {/* Submit Button */}
      <Button
        className="w-full bg-[#FF9101] text-white py-7 hover:bg-orange-500 text-md mt-6 font-inter text-md rounded-lg"
        onClick={handleSubmit}
      >
        Send OTP
      </Button>

      {/* Login Link */}
      <p className="text-sm text-[#002B7A] mt-4 text-left">
        Already have an account?{" "}
        <a href="/login" className="underline font-semibold">
          Login
        </a>
      </p>
    </div>
  );
}
