"use client";
import React, { useState, FormEvent } from "react";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Top Half Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Rectangle.png')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-cyan-500/20 to-blue-500/20"></div>
      </div>

      {/* Bottom Half Grey Background */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-100"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-white text-3xl font-bold">Ek Ticket.com</h1>
        <button
          onClick={() => console.log("Register clicked")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Register
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-30">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-12">
            {/* Left Side - Email/Password Login */}
            <div className="space-y-8">
              <div className="font-kadwa">
                <h2 className="text-4xl font-bold text-gray-800">
                  Log in to your
                </h2>
                <h2 className="text-4xl font-bold text-[#FF9101]">Account</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF9101] w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleLogin(e as any);
                      }
                    }}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-[#002B7A]"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleLogin(e as any);
                      }
                    }}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-[#002B7A]"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Log In
                </button>
              </div>

              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => console.log("Register clicked")}
                  className="text[#002B7A] hover:underline font-semibold"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-center  items-center gap-20 text-sm flex-nowrap">
          <div className="flex flex-wrap justify-center gap-6 text-gray-700">
            <button
              onClick={() => console.log("About Us")}
              className="hover:text-gray-900"
            >
              ABOUT US
            </button>
            <button
              onClick={() => console.log("Contact Us")}
              className="hover:text-gray-900"
            >
              CONTACT US
            </button>
            <button
              onClick={() => console.log("Help")}
              className="hover:text-gray-900"
            >
              HELP
            </button>
            <button
              onClick={() => console.log("Privacy Policy")}
              className="hover:text-gray-900"
            >
              PRIVACY POLICY
            </button>
            <button
              onClick={() => console.log("Disclaimer")}
              className="hover:text-gray-900"
            >
              DISCLAIMER
            </button>
          </div>
          <p className="text-gray-600">Copyright © 2018 • Lift Media Inc.</p>
        </div>
      </footer>
    </div>
  );
}
