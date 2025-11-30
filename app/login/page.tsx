"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormInputField } from "@/components/features/FormInputFields";
import axios from "axios";
import { api } from "@/lib/api";
import { API_URLS } from "@/lib/urls";

// Types
type LoginFormValues = z.infer<typeof loginSchema>;

interface FormFieldProps {
  name: keyof LoginFormValues;
  control: any;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  placeholder: string;
  icon: typeof Phone | typeof Lock;
  iconColor?: string;
}

interface LoginFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: any;
  isValid: boolean;
  isSubmitting: boolean;
  onRegisterClick: () => void;
}

// Constants
const FOOTER_LINKS = ["ABOUT US", "CONTACT US", "HELP", "PRIVACY POLICY", "DISCLAIMER"] as const;

// Schema
const loginSchema = z.object({
  msisdn: z.string().min(11, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Utility Functions
const handleApiError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    console.error("login API error:", err.response?.data || err.message);
    return err.response?.data?.message || "Login failed. Please try again.";
  }
  console.error("Unexpected login error:", err);
  return "An unexpected error occurred. Please try again.";
};

// Components
function FormField({
  name,
  control,
  type = "text",
  placeholder,
  icon: Icon,
  iconColor = "text-primary",
}: FormFieldProps) {
  return (
    <div className="relative text-sm border-2 border-gray-300 rounded-lg">
      <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 ${iconColor} w-5 h-5`} />
      <FormInputField
        name={name}
        control={control}
        type={type}
        placeholder={placeholder}
        inputClassName="pl-12"
      />
    </div>
  );
}

function Header() {
  return (
    <header className="relative z-10 flex justify-between items-center py-8 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-white text-3xl font-bold font-kadwa">Ek Ticket.com</h1>
    </header>
  );
}

function Footer() {
  const handleFooterClick = useCallback((item: string) => {
    console.log(item);
  }, []);

  return (
    <footer className="relative z-10 mt-auto pb-4">
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

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-6">
        <nav className="flex flex-wrap justify-center gap-8 text-sm text-[#0A142F]">
          {FOOTER_LINKS.map((item) => (
            <button
              key={item}
              onClick={() => handleFooterClick(item)}
              className="hover:text-gray-900"
            >
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

function LoginForm({
  onSubmit,
  control,
  isValid,
  isSubmitting,
  onRegisterClick,
}: LoginFormProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
      <div className="p-10 md:p-12 space-y-10">
        <div className="font-kadwa">
          <h2 className="text-4xl font-bold text-[#002B7A]">Log in to your</h2>
          <h2 className="text-4xl font-bold text-primary">Account</h2>
        </div>

        <div className="space-y-4 pt-5">
          <FormField
            name="msisdn"
            control={control}
            type="text"
            placeholder="Phone Number"
            icon={Phone}
          />

          <FormField
            name="password"
            control={control}
            type="password"
            placeholder="*********"
            icon={Lock}
            iconColor="text-gray-400"
          />

          <Button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full bg-[#FF9101] hover:bg-orange-500 text-white py-7 font-inter rounded-lg text-lg transition"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </div>

        <p className="text-left text-[#002B7A]">
          Don't have an account?{" "}
          <button onClick={onRegisterClick} className="text-[#002B7A] underline font-semibold">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

// Custom Hook for Login Logic
function useLoginLogic() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = useCallback(
    async (data: LoginFormValues) => {
      console.log("login form data:", data);
      setError("");

      try {
        const res = await api.post(API_URLS.login, data);
        console.log("login API response:", res);
        
        router.push("/");
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      }
    },
    [router]
  );

  const handleRegisterClick = useCallback(() => {
    router.push("/register");
  }, [router]);

  return {
    control,
    handleSubmit,
    isValid,
    isSubmitting,
    error,
    handleLogin,
    handleRegisterClick,
  };
}

// Main Component
export default function LoginPage() {
  const {
    control,
    handleSubmit,
    isValid,
    isSubmitting,
    error,
    handleLogin,
    handleRegisterClick,
  } = useLoginLogic();

  return (
    <div className="min-h-screen relative overflow-hidden font-inter px-2 sm:px-10 md:px-16 lg:px-30">
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Rectangle.png')",
        }}
      />

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />

      <Header />

      <main className="relative z-10 flex items-center justify-center py-20">
        <LoginForm
          onSubmit={handleSubmit(handleLogin)}
          control={control}
          isValid={isValid}
          isSubmitting={isSubmitting}
          onRegisterClick={handleRegisterClick}
        />
      </main>

      <Footer />
    </div>
  );
}