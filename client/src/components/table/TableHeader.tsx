import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const tableHeaderVariants = cva([
  "bg-slate-700",
  "relative",
  "z-50",
  "before:absolute",
  "before:inset-0",
  "before:bg-slate-700",
  "before:-z-10",
  "shadow-sm"
], {
  variants: {
    variant: {
      default: "",
      bordered: [
        "border-b-2",
        "border-slate-600",
        "shadow-md"
      ],
      glow: [
        "text-slate-50",
        "font-medium",
        "hover:shadow-lg",
        "hover:shadow-slate-500/50",
        "transition-shadow"
      ],
    },
    sticky: {
      true: "sticky top-0",
    }
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {}

export function TableHeader({
  variant,
  sticky,
  className = "",
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={tableHeaderVariants({ variant, sticky, className })}
      {...props}
    />
  );
} 