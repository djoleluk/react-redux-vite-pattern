import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const tableCellVariants = cva(["px-6", "py-4", "relative"], {
  variants: {
    variant: {
      default: "text-slate-400",
      header: "font-semibold text-slate-200",
      glow: [
        "text-slate-200",
        "hover:text-white",
        "hover:shadow-[0_0_25px_#646cffaa]",
        "hover:z-10",
        "transition-all",
        "duration-300",
        "cursor-pointer",
        "relative",
        "hover:bg-slate-800/50",
      ],
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "left",
  },
});

interface TableCellProps
  extends HTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {
  isHeader?: boolean;
}

export function TableCell({
  variant,
  align,
  className = "",
  isHeader = false,
  ...props
}: TableCellProps) {
  const Component = isHeader ? "th" : "td";

  return (
    <Component
      className={tableCellVariants({ variant, align, className })}
      {...props}
    />
  );
} 