"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/features/FormInputFields";

import VerifyOtp from "@/components/VerifyOtp";
import SetPassword from "@/components/SetPassword";
import SuccessPage from "@/components/SuccessPage";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const registerSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  passengerType: z.string().min(1, "Please select a passenger type"),
});

function PassengerTypePopover({ value, onChange }: any) {
  const options = ["Adult", "Student", "Child"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full h-12  pl-12 pr-10   text-left rounded-lg bg-white text-[#002B7A] focus:outline-none"
        >
          {value || "Passenger Type"}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-ful rounded-md border bg-white shadow-lg" align="start">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`w-full px-4 py-2 text-left text-sm font-inter hover:bg-gray-100 ${
              value === opt ? "bg-gray-50 font-medium" : ""
            }`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [step, setStep] = useState<"register" | "verify" | "password" | "success">("register");
  const [savedEmail, setSavedEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormValues) => {
    setSavedEmail(data.email);
    setStep("password");
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-inter ">
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Rectangle.png')" }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />

      <header className="relative z-10 max-w-6xl mx-auto w-full flex justify-between items-center py-8 px-4 md:px-20">
        <h1 className="text-white text-3xl font-bold font-kadwa">Ek Ticket.com</h1>

        <a
          href="/login"
          className="bg-orange-400 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
        >
          Log in
        </a>
      </header>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {step === "register" && (
          <div className="w-full max-w-[584px] bg-white rounded-[30px] shadow-2xl px-8 md:px-10 py-12 mx-auto ">
            <section>
              <div className="font-kadwa mb-6">
                <h2 className="text-4xl font-bold text-[#002B7A]">Create Your</h2>
                <h2 className="text-4xl font-bold text-[#FF9101]">Ek ticket</h2>
                <h2 className="text-4xl font-bold text-[#002B7A]">Account</h2>
              </div>

              <p className="text-lg text-[#52515C] mb-4 leading-tight">
                Enter Your Email Address <br /> To Begin Registration
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div className="relative border border-gray-300 rounded-lg">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <FormInputField
                    name="fullName"
                    control={control}
                    placeholder="Full Name"
                    inputClassName="pl-12 h-12 pr-4 text-[#002B7A] placeholder:text-[#002B7A]"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName.message}</p>
                )}

                {/* Phone */}
                <div className="relative border border-gray-300 rounded-lg">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <FormInputField
                    name="phone"
                    control={control}
                    placeholder="Phone Number"
                    inputClassName="pl-12 h-12 pr-4 text-[#002B7A] placeholder:text-[#002B7A]"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}

                {/* Email */}
                <div className="relative border border-gray-300 rounded-lg">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <FormInputField
                    name="email"
                    control={control}
                    type="email"
                    placeholder="Email Address"
                    inputClassName="pl-12 h-12 pr-4 text-[#002B7A] placeholder:text-[#002B7A]"
                  />
                </div>

                {/* Passenger Type */}
                <div className="relative border border-gray-300 rounded-lg">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />

                  <Controller
                    name="passengerType"
                    control={control}
                    render={({ field }) => (
                      <PassengerTypePopover value={field.value} onChange={field.onChange} />
                    )}
                  />
                  <ChevronDown className=" pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-8 h-5" />
                </div>

                {errors.passengerType && (
                  <p className="text-xs text-red-500">{errors.passengerType.message}</p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full bg-[#FF9101] hover:bg-orange-600 text-white py-7 font-inter rounded-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send OTP"}
                </Button>

                <p className="text-sm text-[#002B7A] text-left">
                  Already have an account?{" "}
                  <a href="/login" className="underline font-semibold">
                    Login
                  </a>
                </p>
              </form>
            </section>
          </div>
        )}

        {step === "password" && <SetPassword onSuccess={() => setStep("verify")} />}

        {step === "verify" && <VerifyOtp email={savedEmail} onSuccess={() => setStep("success")} />}

        {step === "success" && <SuccessPage />}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 mt-auto pb-6">
        <div className="w-full pt-6">
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
        </div>

        <div className="max-w-7xl mx-auto px-15 py-6 flex flex-wrap items-center justify-between gap-6">
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-[#0A142F]">
            {["ABOUT US", "CONTACT US", "HELP", "PRIVACY POLICY", "DISCLAIMER"].map((item) => (
              <button key={item} className="hover:text-gray-900">
                {item}
              </button>
            ))}
          </nav>

          <p className="text-gray-600 text-sm whitespace-nowrap">
            Copyright © 2018 • Lift Media Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
