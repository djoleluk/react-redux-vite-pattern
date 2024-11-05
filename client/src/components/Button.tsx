import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  ["rounded-lg", "transition-colors", "font-semibold"], 
  {
    variants: {
      variant: {
        primary_outline: [
          "bg-transparent",
          "text-blue-900",
          "border",
          "border-blue-800",
          "hover:bg-blue-700",
          "hover:border-blue-600",
          "hover:text-white",
        ],
        secondary: [
          "bg-slate-800",
          "text-white",
          "border",
          "border-slate-700",
          "hover:bg-slate-700",
          "hover:border-slate-600",
        ],
        outline: [
          "bg-transparent",
          "border",
          "border-slate-400",
          "hover:bg-slate-800",
          "hover:border-slate-300",
        ],
        danger: [
          "bg-transparent",
          "text-red-400",
          "border",
          "border-red-800",
          "hover:bg-red-900/50",
          "hover:text-red-200",
          "hover:border-red-700",
        ],
      },
      size: {
        tiny: ["text-xs", "px-2", "py-1"],
        small: ["text-sm", "px-3", "py-1"],
        medium: ["text-base", "px-4", "py-2"],
        large: ["text-lg", "px-6", "py-3"],
      },
    },
    defaultVariants: {
      variant: "primary_outline",
      size: "medium",
    },
  }
);

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {}

export function Button({ 
  variant, 
  size, 
  className = "", 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
} 