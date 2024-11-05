import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const tableRowVariants = cva(["border-b", "border-slate-700"], {
  variants: {
    variant: {
      default: "hover:bg-slate-800",
      header: "bg-slate-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

export function TableRow({
  variant,
  className = "",
  ...props
}: TableRowProps) {
  return (
    <tr
      className={tableRowVariants({ variant, className })}
      {...props}
    />
  );
} 