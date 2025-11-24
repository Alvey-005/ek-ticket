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
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 mx-auto font-inter">
      {/* Title */}
      <h2 className="text-4xl font-bold text-[#002B7A] leading-tight">
        Set Your
      </h2>
      <h2 className="text-4xl font-bold text-[#FF9101] -mt-1">Password</h2>

      {/* Subtitle */}
      <p className="text-gray-600 mt-4 text-base">
        Create A Secure Password <br /> For Your Account
      </p>

      {/* Password Input */}
      <div className="relative mt-8">
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
        className="w-full bg-[#FF9101] text-white py-3 mt-6 text-lg rounded-lg"
        onClick={handleSubmit}
      >
        Send OTP
      </Button>

      {/* Login Link */}
      <p className="text-sm text-[#0A142F] mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="underline font-semibold">
          Login
        </a>
      </p>
    </div>
  );
}
