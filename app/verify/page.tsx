"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30); // 30s countdown

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("OTP entered:", enteredOtp);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-inter px-6 sm:px-10 md:px-16 lg:px-30">
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Rectangle.png')",
        }}
      />

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />

     
      <header className="relative z-10 flex justify-between items-center py-8 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-white text-3xl font-bold font-kadwa">
          Ek Ticket.com
        </h1>
        <a
          href="/login"
          className="bg-orange-400 font-inter text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          Log in
        </a>
      </header>

      <main className="relative z-10 flex items-center justify-center py-20">
     
        <div className="bg-white  rounded-3xl  w-full max-w-lg overflow-hidden text-center">
          <div className="p-10 md:p-12 space-y-6">
            <div className="font-kadwa text-left space-y-2">
              <div>
                <h2 className="text-4xl font-bold text-[#002B7A] leading-tight">
                  Verify
                </h2>
                <h2 className="text-4xl font-bold text-[#FF9101] leading-tight">
                  OTP
                </h2>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-2 font-inter">
                We Sent A 6-Digit OTP Code To <br />
                <span className="">Test@Testmail.Com</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-5 pt-10">
              <div className="space-y-3 text-left">
                <p className="text-gray-600 text-sm mb-2 text-left ">
                  Enter OTP
                </p>
                <div className="flex justify-start gap-3 sm:gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      className="aspect-square min-w-10 sm:min-w-12 flex-1 max-w-16 text-center text-lg sm:text-xl border border-[#002B7A] rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-[#002B7A] font-semibold"
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF9101] text-white py-6 rounded-lg font-semibold"
              >
                Verify OTP
              </Button>

              <p className="text-sm text-gray-700 text-center">
                Didn’t get an email?{" "}
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => setTimer(30)}
                  className={`font-semibold underline ${
                    timer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#002B7A]"
                  }`}
                >
                  Resend verification code{" "}
                  {timer > 0 && (
                    <span className="text-[#002B7A] font-medium">
                      (00:{timer < 10 ? `0${timer}` : timer}s)
                    </span>
                  )}
                </button>
              </p>
            </form>
          </div>
        </div>

        <footer className="absolute bottom-0 w-full mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <Image
              src="/images/line.png"
              alt=""
              width={1920}
              height={2}
              className="w-full opacity-70"
              priority
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-6">
            <nav className="flex flex-wrap justify-center gap-8 text-sm text-[#0A142F]">
              {[
                "ABOUT US",
                "CONTACT US",
                "HELP",
                "PRIVACY POLICY",
                "DISCLAIMER",
              ].map((item) => (
                <a key={item} href="#" className="hover:text-gray-900">
                  {item}
                </a>
              ))}
            </nav>
            <p className="text-gray-600 text-sm whitespace-nowrap">
              Copyright © 2018 • Lift Media Inc.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
