"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormInputField } from "@/components/features/FormInputFields";

// Constants
const FOOTER_LINKS = ["ABOUT US", "CONTACT US", "HELP", "PRIVACY POLICY", "DISCLAIMER"] as const;

// Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Components
interface FormFieldProps {
  name: keyof LoginFormValues;
  control: any;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  placeholder: string;
  icon: typeof Mail | typeof Lock;
  iconColor?: string;
}

function FormField({
  name,
  control,
  type,
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

interface LoginFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  control: any;
  isValid: boolean;
  isSubmitting: boolean;
  onRegisterClick: () => void;
}

function LoginForm({ onSubmit, control, isValid, isSubmitting, onRegisterClick }: LoginFormProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
      <div className="p-10 md:p-12 space-y-8">
        <div className="font-kadwa">
          <h2 className="text-4xl font-bold text-[#002B7A]">Log in to your</h2>
          <h2 className="text-4xl font-bold text-primary">Account</h2>
        </div>

        <div className="space-y-4">
          <FormField
            name="email"
            control={control}
            type="email"
            placeholder="Email Address"
            icon={Mail}
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
            className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold"
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

// Main Component
export default function LoginPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = useCallback(
    (data: LoginFormValues) => {
      router.push("/verify");
    },
    [router]
  );

  const handleRegisterClick = useCallback(() => {
    router.push("/register");
  }, [router]);

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
