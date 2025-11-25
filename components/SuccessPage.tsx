"use client";

import { useCallback } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

// Constants
const SUCCESS_MESSAGE = {
  title: "Account Created Successfully",
  description:
    "Your NRB Connect account has been created. You can now log in and access citizen services, jobs, and more.",
} as const;

// Components
function SuccessIcon() {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-[#002B7A] rounded-full flex items-center justify-center">
        <Check className="text-white w-12 h-12" />
      </div>
    </div>
  );
}

interface SuccessTitleProps {
  title: string;
}

function SuccessTitle({ title }: SuccessTitleProps) {
  const lines = title.split(" ");
  const midpoint = Math.ceil(lines.length / 2);
  const firstLine = lines.slice(0, midpoint).join(" ");
  const secondLine = lines.slice(midpoint).join(" ");

  return (
    <>
      <h2 className="text-2xl text-center text-[#002B7A] leading-snug">{firstLine}</h2>
      <h2 className="text-2xl text-center text-[#002B7A] leading-snug">{secondLine}</h2>
    </>
  );
}

interface SuccessDescriptionProps {
  description: string;
}

function SuccessDescription({ description }: SuccessDescriptionProps) {
  return (
    <p className="text-gray-600 mt-3 text-base leading-none text-center px-6 py-6">
      {description}
    </p>
  );
}

interface LoginButtonProps {
  onClick: () => void;
}

function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full bg-[#FF9101] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
    >
      Log In
    </button>
  );
}

// Main Component
export default function SuccessPage() {
  const router = useRouter();

  const handleLoginClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="max-w-lg w-full rounded-[30px] bg-white shadow-2xl px-10 py-20 mx-auto">
      <SuccessIcon />

      <SuccessTitle title={SUCCESS_MESSAGE.title} />

      <SuccessDescription description={SUCCESS_MESSAGE.description} />

      <LoginButton onClick={handleLoginClick} />
    </div>
  );
}