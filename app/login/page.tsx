"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/features/FormInputFields"; // same shared component as Contact Us

// ✅ Schema validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = (data: LoginFormValues) => {
    console.log("Login attempt:", data);
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

      {/*  */}
      <header className="relative z-10 flex justify-between items-center py-8 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-white text-3xl font-bold font-kadwa">
          Ek Ticket.com
        </h1>
        <button
          onClick={() => console.log("Register clicked")}
          className="bg-orange-400 font-inter hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          Register
        </button>
      </header>

      <main className="relative z-10 flex items-center justify-center py-20">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
          <div className="p-10 md:p-12 space-y-8">
            <div className="font-kadwa">
              <h2 className="text-4xl font-bold text-[#002B7A]">
                Log in to your
              </h2>
              <h2 className="text-4xl font-bold text-primary">Account</h2>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 ">
              {/* Email */}
              <div className="relative text-sm border-2 border-gray-300 rounded-lg">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                <FormInputField
                  name="email"
                  control={control}
                  type="email"
                  placeholder="Email Address"
                  inputClassName="pl-12" // space for icon
                />
              </div>

              <div className="relative border-2 border-gray-300 rounded-lg">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <FormInputField
                  name="password"
                  control={control}
                  type="password"
                  placeholder="*********"
                  inputClassName="pl-12"
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full bg-[#FF9101] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>
            </form>

            <p className="text-left text-[#002B7A]">
              Don’t have an account?{" "}
              <button
                onClick={() => console.log("Register clicked")}
                className="text-[#002B7A] underline font-semibold"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </main>

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
            {[
              "ABOUT US",
              "CONTACT US",
              "HELP",
              "PRIVACY POLICY",
              "DISCLAIMER",
            ].map((item) => (
              <button
                key={item}
                onClick={() => console.log(item)}
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
    </div>
  );
}
