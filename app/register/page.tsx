"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User, IdCard, LucideIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/features/FormInputFields";
import VerifyOtp from "@/components/VerifyOtp";
import SetPassword from "@/components/SetPassword";
import SuccessPage from "@/components/SuccessPage";
import axios from "axios";
import { api } from "@/lib/api";
import { API_URLS } from "@/lib/urls";

// Types
type Step = "register" | "verify" | "password" | "success";

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface FormFieldProps {
  name: keyof RegisterFormValues;
  control: any;
  placeholder: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  error?: string;
  icon: LucideIcon;
  maxLength?: number;
}

interface RegisterFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: any;
  errors: any;
  isValid: boolean;
  isSubmitting: boolean;
}

// Constants
const FOOTER_LINKS = ["ABOUT US", "CONTACT US", "HELP", "PRIVACY POLICY", "DISCLAIMER"] as const;

// Schema
const registerSchema = z
  .object({
    full_name: z.string().min(1, "Please enter your full name"),
    msisdn: z.string().min(11, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email address"),
    nid: z.string().length(10, "NID number must be exactly 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

// Utility Functions
const handleApiError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    console.error("register API error:", err.response?.data);
    return err.response?.data?.message || "Registration failed. Please try again.";
  }
  console.error("Unexpected error:", err);
  return "An unexpected error occurred. Please try again.";
};

// Components
function FormField({
  name,
  control,
  placeholder,
  type = "text",
  error,
  icon: Icon,
  maxLength,
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
          maxLength={maxLength}
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
  const handleFooterClick = useCallback((item: string) => {
    console.log(item);
  }, []);

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
            <button key={item} onClick={() => handleFooterClick(item)} className="hover:text-gray-900">
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
            name="full_name"
            control={control}
            placeholder="Full Name"
            icon={User}
            error={errors.full_name?.message}
          />

          <FormField
            name="msisdn"
            control={control}
            placeholder="Phone Number"
            icon={Phone}
            error={errors.msisdn?.message}
          />

          <FormField
            name="email"
            control={control}
            type="email"
            placeholder="Email Address"
            icon={Mail}
            error={errors.email?.message}
          />

          <FormField
            name="nid"
            control={control}
            placeholder="NID Number"
            type="text"
            icon={IdCard}
            error={errors.nid?.message}
            maxLength={10}
          />

          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#FF9101] hover:bg-orange-500 text-white py-7 font-inter rounded-lg text-lg transition"
          >
            {isSubmitting ? "Sending..." : "CONTINUE"}
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

// Custom Hook for Register Logic
function useRegisterLogic() {
  const [step, setStep] = useState<Step>("register");
  const [error, setError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    getValues,
    trigger,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      msisdn: "",
      email: "",
      nid: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = useCallback(() => {
    console.log("onSubmit - form data:", getValues());
    setStep("password");
  }, [getValues]);

  const onFormSubmit = useCallback(() => {
    console.log("calling form submit...");
    const submit = handleSubmit(async (data: RegisterFormValues) => {
      console.log("onFormSubmit - form data with password:", data);
      setError("");

      try {
        const res = await api.post(API_URLS.register, data);
        console.log("register API response:", res);
        
        // TODO: Handle token/user info if backend returns it
        // Example: localStorage.setItem('token', res.data.token);
        
        setStep("success");
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        // You can display this error in the UI if needed
      }
    });

    submit();
  }, [handleSubmit]);

  const handlePasswordSuccess = useCallback(() => {
    setStep("success");
  }, []);

  return {
    step,
    error,
    control,
    errors,
    isValid,
    isSubmitting,
    setValue,
    getValues,
    trigger,
    onSubmit,
    onFormSubmit,
    handlePasswordSuccess,
  };
}

// Main Component
export default function RegisterPage() {
  const {
    step,
    error,
    control,
    errors,
    isValid,
    isSubmitting,
    setValue,
    getValues,
    trigger,
    onSubmit,
    onFormSubmit,
    handlePasswordSuccess,
  } = useRegisterLogic();

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
            onSubmit={onSubmit}
            control={control}
            errors={errors}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        )}

        {step === "password" && (
          <SetPassword
            onSubmit={onFormSubmit}
            onSuccess={handlePasswordSuccess}
            setValue={setValue}
            getValues={getValues}
            trigger={trigger}
          />
        )}

        {step === "success" && <SuccessPage />}
      </main>

      <Footer />
    </div>
  );
}