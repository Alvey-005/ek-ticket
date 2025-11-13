"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/features/FormInputFields";

const registerSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  passengerType: z.string().min(1, "Please select a passenger type"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
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
      passengerType: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Register:", data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-inter px-6 sm:px-10 md:px-16 lg:px-30">

      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Rectangle.png')" }}
      />

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-100" />

      <header className="relative z-10 flex justify-between items-center py-8 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-white text-3xl font-bold font-kadwa">Ek Ticket.com</h1>
        <a
          href="/login"
          className="bg-orange-400 font-inter hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          Log in
        </a>
      </header>

      <main className="relative z-10 flex items-center justify-center py-20">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 md:p-14">

            <section>
              <div className="font-kadwa mb-6">
                <h2 className="text-4xl font-bold text-[#002B7A]">Create Your</h2>
                <h2 className="text-4xl font-bold text-[#FF9101]">Ek ticket</h2>
                <h2 className="text-4xl font-bold text-[#002B7A]">Account</h2>
              </div>

              <p className="text-sm text-[#0A142F] mb-4">
                Enter Your Email Address <br />
                To Begin Registration
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative border border-gray-300 rounded-lg">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <FormInputField
                    name="fullName"
                    control={control}
                    placeholder="Full Name"
                    inputClassName="pl-12 h-12 pr-4 text-[#002B7A] focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName.message}</p>
                )}

                {/*  */}
                <div className="relative border border-gray-300 rounded-lg">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <FormInputField
                    name="phone"
                    control={control}
                    placeholder="Phone Number"
                    inputClassName="pl-12 h-12 pr-4 text-[#002B7A] focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}

                {/* Email */}
                <div className="relative border border-gray-300 rounded-lg">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <FormInputField
                    name="email"
                    control={control}
                    type="email"
                    placeholder="Email Address"
                    inputClassName="pl-12 h-12 pr-4 text-[#002B7A] focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}

          
                <div className="relative border border-gray-300 rounded-lg">
                  <Controller
                    name="passengerType"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="appearance-none w-full h-12 rounded-lg pl-4 pr-10 text-[#002B7A] focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      >
                        <option value="" disabled>
                          Passenger Type
                        </option>
                        <option value="Adult">Adult</option>
                        <option value="Student">Student</option>
                        <option value="Child">Child</option>
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.passengerType && (
                  <p className="text-xs text-red-500">{errors.passengerType.message}</p>
                )}

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full bg-[#FF9101] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send OTP"}
                </Button>

                <p className="text-sm text-[#0A142F]">
                  Already have an account?{" "}
                  <a href="/login" className="underline font-semibold">
                    Login
                  </a>
                </p>
              </form>
            </section>

            <section className="flex flex-col justify-center gap-4 md:pl-10">
              <div className="flex items-center justify-center md:hidden">
                <div className="w-px h-24 bg-gray-300" />
              </div>
              <Button
                variant="outline"
                className="w-full justify-start border border-gray-300 rounded-lg text-[#0A142F]"
              >
                🌐 Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border border-gray-300 rounded-lg text-[#0A142F]"
              >
                 Continue with Apple
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border border-gray-300 rounded-lg text-[#0A142F]"
              >
                f Continue with Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border border-gray-300 rounded-lg text-[#0A142F]"
              >
                💬 Continue with We chat
              </Button>
            </section>
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
      
              {/* Footer Content */}
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
