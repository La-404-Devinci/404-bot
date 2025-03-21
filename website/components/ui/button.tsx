"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
  type?: "filled" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const buttonVariants = {
  primary: {
    filled: "bg-blue-700 hover:bg-blue-700/50",
    outline: "border-blue-700 hover:bg-blue-700/50",
  },
  secondary: {
    filled: "bg-blue-900 hover:bg-blue-900/50",
    outline: "border-blue-900 hover:bg-blue-900/50",
  },
  white: {
    filled: "bg-white hover:bg-white/50",
    outline: "border-white hover:bg-white/50",
  },
};

const buttonSizes = {
  small: "px-4 py-2",
  medium: "px-6 py-3",
  large: "px-8 py-4",
};

export default function Button({
  children,
  variant = "primary",
  type = "filled",
  size = "medium",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer",
        buttonVariants[variant][type],
        buttonSizes[size]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
