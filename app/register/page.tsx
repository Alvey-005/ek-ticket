"use client";

import React, { useState, useCallback } from "react";
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
import { LucideIcon } from "lucide-react";

// Constants
const PASSENGER_TYPES = ["Adult", "Student", "Child"] as const;
const FOOTER_LINKS = ["ABOUT US", "CONTACT US", "HELP", "PRIVACY POLICY", "DISCLAIMER"] as const;

type Step = "register" | "verify" | "password" | "success";

// Schema
const registerSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  passengerType: z.string().min(1, "Please select a passenger type"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// Components
interface PassengerTypePopoverProps {
  value: string;
  onChange: (value: string) => void;
}

function PassengerTypePopover({ value, onChange }: PassengerTypePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-full h-12 pl-12 pr-10 text-left rounded-lg bg-white text-[#002B7A] focus:outline-none"
          aria-label="Select passenger type"
        >
          {value || "Passenger Type"}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full rounded-md border bg-white shadow-lg" align="start">
        {PASSENGER_TYPES.map((opt) => (
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
interface FormFieldProps {
  name: keyof RegisterFormValues;
  control: any;
  placeholder: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  error?: string;
  icon: LucideIcon;
}

function FormField({
  name,
  control,
  placeholder,
  type = "text",
  error,
  icon: Icon,
}: FormFieldProps) {
  return (
    <>
      <div className="relative border border-gray-300 rounded-lg">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
        <FormInputField
          name={name}
          control={control}
          type={type}
          placeholder={placeholder}
          inputClassName="pl-12 h-12 pr-4 text-[#002B7A] placeholder:text-[#002B7A]"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </>
  );
}

function Header() {
  return (
    <header className="relative z-10 max-w-6xl mx-auto w-full flex justify-between items-center py-8 px-4 md:px-20">
      <h1 className="text-white text-3xl font-bold font-kadwa">Ek Ticket.com</h1>
      <a
        href="/login"
        className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition"
      >
        Log in
      </a>
    </header>
  );
}

function Footer() {
  return (
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
          {FOOTER_LINKS.map((item) => (
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
  );
}

interface RegisterFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: any;
  errors: any;
  isValid: boolean;
  isSubmitting: boolean;
}

function RegisterForm({ onSubmit, control, errors, isValid, isSubmitting }: RegisterFormProps) {
  return (
    <div className="w-full max-w-[584px] bg-white rounded-[30px] shadow-2xl px-8 md:px-10 py-12 mx-auto">
      <section>
        <div className="font-kadwa mb-4">
          <h2 className="text-4xl font-bold text-[#002B7A]">Create Your</h2>
          <h2 className="text-4xl font-bold text-[#FF9101]">Ek ticket</h2>
          <h2 className="text-4xl font-bold text-[#002B7A]">Account</h2>
        </div>

        <p className="text-xl text-[#52515C] mb-5 leading-tight">
          Enter Your Email Address <br /> To Begin Registration
        </p>

        <div className="space-y-4">
          <FormField
            name="fullName"
            control={control}
            placeholder="Full Name"
            icon={User}
            error={errors.fullName?.message}
          />

          <FormField
            name="phone"
            control={control}
            placeholder="Phone Number"
            icon={Phone}
            error={errors.phone?.message}
          />

          <FormField
            name="email"
            control={control}
            type="email"
            placeholder="Email Address"
            icon={Mail}
            error={errors.email?.message}
          />

          <div className="relative border border-gray-300 rounded-lg">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
            <Controller
              name="passengerType"
              control={control}
              render={({ field }) => (
                <PassengerTypePopover value={field.value} onChange={field.onChange} />
              )}
            />
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-8 h-5" />
          </div>
          {errors.passengerType && (
            <p className="text-xs text-red-500">{errors.passengerType.message}</p>
          )}

          <Button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full bg-[#FF9101] hover:bg-orange-500 text-white py-7 font-inter rounded-lg text-lg transition"
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </Button>

          <p className="text-sm text-[#002B7A] text-left">
            Already have an account?{" "}
            <a href="/login" className="underline font-semibold">
              Login
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

// Main Component
export default function RegisterPage() {
  const [step, setStep] = useState<Step>("register");
  const [savedEmail, setSavedEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      passengerType: "", // <-- REQUIRED!!
    },
  });

  const onSubmit = useCallback((data: RegisterFormValues) => {
    setSavedEmail(data.email);
    setStep("verify");
  }, []);



const handleVerifySuccess = useCallback(() => {
  setStep("password");
}, []);

const handlePasswordSuccess = useCallback(() => {
  setStep("success");
}, []);


  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Rectangle.png')" }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />

      <Header />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {step === "register" && (
          <RegisterForm
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            errors={errors}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        )}

        {step === "password" && <SetPassword onSuccess={handlePasswordSuccess} />}

        {step === "verify" && <VerifyOtp email={savedEmail} onSuccess={handleVerifySuccess} />}



        {step === "success" && <SuccessPage />}
      </main>

      <Footer />
    </div>
  );
}
