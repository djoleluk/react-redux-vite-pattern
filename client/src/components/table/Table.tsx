import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const tableVariants = cva(
  [
    "w-full", 
    "text-sm", 
    "text-left", 
    "border-collapse",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-slate-900",
          "border-3",
          "border-slate-400",
          "rounded-lg",
          "[&_tr:first-child_th:first-child]:rounded-tl-lg",
          "[&_tr:first-child_th:last-child]:rounded-tr-lg",
          "[&_tr:last-child_td:first-child]:rounded-bl-lg",
          "[&_tr:last-child_td:last-child]:rounded-br-lg",
        ],
        simple: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export function Table({
  variant,
  className = "",
  ...props
}: TableProps) {
  return (
    <div className="relative isolate">
      <div className={`
        max-h-[500px] overflow-auto rounded-lg ring-2 ring-slate-400
        [&::-webkit-scrollbar]:w-3
        [&::-webkit-scrollbar]:h-3
        [&::-webkit-scrollbar-track]:bg-slate-800
        [&::-webkit-scrollbar-track]:rounded-lg
        [&::-webkit-scrollbar-thumb]:bg-slate-600
        [&::-webkit-scrollbar-thumb]:rounded-lg
        [&::-webkit-scrollbar-thumb]:border-4
        [&::-webkit-scrollbar-thumb]:border-slate-800
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500
        [&::-webkit-scrollbar-thumb]:transition-colors
        [&::-webkit-scrollbar-thumb]:duration-150
        pr-2
      `}>
        <table className={tableVariants({ variant, className })} {...props} />
      </div>
    </div>
  );
} 