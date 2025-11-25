"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

// Types
interface SetPasswordProps {
  onSuccess: () => void;
}

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

// Constants
const ERROR_MESSAGES = {
  REQUIRED: "Both fields are required",
  MISMATCH: "Passwords do not match",
} as const;

// Components
function PasswordInput({ value, onChange, placeholder }: PasswordInputProps) {
  return (
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002B7A] w-5 h-5" />
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-lg text-[#002B7A] text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

function Title() {
  return (
    <div>
      <h2 className="text-4xl font-kadwa font-bold text-[#002B7A] leading-tight">Set Your</h2>
      <h2 className="text-4xl font-kadwa font-bold text-[#FF9101] -mt-1">Password</h2>
    </div>
  );
}

function Subtitle() {
  return (
    <p className="text-gray-600 mt-4 text-xl leading-tight">
      Create A Secure Password <br /> For Your Account
    </p>
  );
}

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return <p className="text-red-600 mt-2 text-sm">{message}</p>;
}

// Main Component
export default function SetPassword({ onSuccess }: SetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  }, [error]);

  const handleConfirmChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
    if (error) setError("");
  }, [error]);

  const handleSubmit = useCallback(() => {
    if (!password || !confirm) {
      setError(ERROR_MESSAGES.REQUIRED);
      return;
    }
    if (password !== confirm) {
      setError(ERROR_MESSAGES.MISMATCH);
      return;
    }

    setError("");
    onSuccess();
  }, [password, confirm, onSuccess]);

  return (
    <div className="max-w-xl w-full rounded-[30px] bg-white shadow-2xl px-15 py-20 mx-auto">
      <Title />
      
      <Subtitle />

      <div className="mt-10 space-y-4">
        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          placeholder="**********"
        />

        <PasswordInput
          value={confirm}
          onChange={handleConfirmChange}
          placeholder="Confirm New Password"
        />
      </div>

      <ErrorMessage message={error} />

      <Button
        className="w-full bg-[#FF9101] text-white py-7 hover:bg-orange-500 text-md mt-6 font-inter text-md rounded-lg"
        onClick={handleSubmit}
      >
        Send OTP
      </Button>

      <p className="text-sm text-[#002B7A] mt-4 text-left">
        Already have an account?{" "}
        <a href="/login" className="underline font-semibold">
          Login
        </a>
      </p>
    </div>
  );
}