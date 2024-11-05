import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const cardVariants = cva(
  ["rounded-lg", "transition-shadow"],
  {
    variants: {
      variant: {
        default: [
          "bg-slate-800",
          "border",
          "border-slate-700",
        ],
        elevated: [
          "bg-slate-800/90",
          "shadow-lg",
          "backdrop-blur-sm",
        ],
      },
      padding: {
        none: "p-0",
        small: "p-4",
        medium: "p-6",
        large: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "medium",
    },
  }
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({
  variant,
  padding,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={cardVariants({ variant, padding, className })}
      {...props}
    />
  );
} 