import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, Children } from "react";

const tableBodyVariants = cva([""], {
  variants: {
    variant: {
      default: "bg-transparent",
      striped: [
        "[&>tr:nth-child(odd)]:bg-slate-800/50",
        "[&>tr:nth-child(even)]:bg-transparent",
      ],
    },
    dividers: {
      none: "",
      thin: "[&>tr]:border-b [&>tr]:border-slate-700",
      thick: "[&>tr]:border-b-2 [&>tr]:border-slate-700",
    }
  },
  defaultVariants: {
    variant: "default",
    dividers: "thin",
  },
});

interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {}

export function TableBody({
  variant,
  dividers,
  className = "",
  children,
  ...props
}: TableBodyProps) {
  const hasChildren = Children.count(children) > 0;

  return (
    <tbody
      className={tableBodyVariants({ variant, dividers, className })}
      {...props}
    >
      {hasChildren ? children : (
        <tr>
          <td 
            colSpan={7} 
            className="text-center text-slate-500"
          >
            No data available
          </td>
        </tr>
      )}
    </tbody>
  );
} 