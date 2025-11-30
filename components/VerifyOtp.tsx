"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import cn from "classnames";
import axios from "axios";


const OTP_LENGTH = 6;
const OTP_TIME = 60;

export default function VerifyOtp({ email, onSuccess }: { email: string; onSuccess: () => void }) {
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const [errors, setErrors] = useState(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(OTP_TIME);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const resetTimer = () => {
    setTimer(OTP_TIME);
    setCanResend(false);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };


  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/, "");
    if (digit.length > 1) return;

    const newValues = [...otpValues];
    newValues[index] = digit;
    setOtpValues(newValues);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pasted.length === OTP_LENGTH) {
      setOtpValues(pasted.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otpValues.some((v) => !v)) {
      setErrors(otpValues.map((v) => (v ? "" : "Required")));
      return;
    }

    setOtpError("");

    onSuccess();
  };

  const handleResend = () => {
    if (!canResend) return;

    resetTimer();
    setOtpValues(Array(OTP_LENGTH).fill(""));
    setErrors(Array(OTP_LENGTH).fill(""));
    setOtpError("");

    console.log("Resend OTP");
  };

  return (
    <div className="max-w-xl w-full rounded-[30px] bg-white shadow-2xl px-15 py-20 mx-auto">
      <h2 className="text-5xl font-bold font-kadwa text-[#002B7A]">Verify</h2>
      <h2 className="text-5xl font-bold font-kadwa text-[#FF9101]">OTP</h2>

      <p className="text-xl text-[#52515C] mt-4 leading-tight">
        We sent a 6-digit OTP code to:
        <br />
        <span className="font-inter">{email}</span>
      </p>



      {/* OTP Boxes */}
      <div className="flex justify-center gap-3 mt-25">
        
        {otpValues.map((value, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={idx === 0 ? handlePaste : undefined}
            className={cn(
              "w-10 h-10  md:w-15 md:h-15 border sm:w-12 sm:h-14 rounded-md text-center text-xl",

              errors[idx] ? "border-red-500" : "border-[#002B7A]"
            )}
          />
        ))}
      </div>

      {/* Error Message */}
      {otpError && <p className="text-center text-sm text-red-600 mt-3">{otpError}</p>}

      {/* Verify Button */}
      <Button
        className="w-full bg-[#FF9101] hover:bg-orange-500 text-white mt-8 py-7 font-inter rounded-lg text-md transition"
        disabled={!otpValues.every((v) => v)}
        onClick={handleVerify}
      >
        Verify OTP
      </Button>

      {/* Resend Section */}
      <p className="text-sm text-gray-600 text-center mt-4">
        Didn’t get a code?{" "}
        <button
          disabled={!canResend}
          onClick={handleResend}
          className={`underline ${canResend ? "text-[#002B7A]" : "text-gray-400"}`}
        >
          Resend {timer > 0 && `(${formatTimer(timer)})`}
        </button>
      </p>
    </div>
  );
}
