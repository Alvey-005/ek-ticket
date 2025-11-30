"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import type { UseFormSetValue, UseFormGetValues, UseFormTrigger } from "react-hook-form";
import type { RegisterFormValues } from "@/app/register/page";


// Types
interface SetPasswordProps {
  onSubmit: () => void;
  onSuccess: () => void;
  setValue: UseFormSetValue<RegisterFormValues>;
  getValues: UseFormGetValues<RegisterFormValues>;
  trigger: UseFormTrigger<RegisterFormValues>;
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

function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return <p className="text-red-600 mt-2 text-sm">{message}</p>;
}

// Main Component
export default function SetPassword({
  onSubmit,
  onSuccess,
  setValue,
  getValues,
  trigger,
}: SetPasswordProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue("password", value);
      trigger("password");

      if (error) setError("");
    },
    [error, setValue, trigger]
  );

  const handleConfirmChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // use the same field name as the form schema: `password_confirmation`
      setValue("password_confirmation", value);
      trigger("password_confirmation");

      if (error) setError("");
    },
    [error, setValue, trigger]
  );

  return (
    <div className="max-w-xl w-full rounded-[30px] bg-white shadow-2xl px-15 py-20 mx-auto">
      <Title />
      <Subtitle />

      <div className="mt-10 space-y-4">
        <PasswordInput
          value={getValues("password")}
          onChange={handlePasswordChange}
          placeholder="**********"
        />

        <PasswordInput
          // read password confirmation from the same key used in the schema
          value={getValues("password_confirmation")}
          onChange={handleConfirmChange}
          placeholder="Confirm New Password"
        />
      </div>

      <ErrorMessage message={error} />

      <Button
        className="w-full bg-[#FF9101] text-white py-7 hover:bg-orange-500 text-md mt-6 font-inter rounded-lg"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Continue"}
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
