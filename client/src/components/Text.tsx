import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const textVariants = cva([""], {
  variants: {
    variant: {
      heading: [
        "text-3xl",
        "font-bold",
      ],
      subheading: [
        "text-xl",
        "font-semibold",
        "text-slate-200",
      ],
      body: [
        "text-base",
        "text-slate-400",
      ],
      code: [
        "font-mono",
        "bg-slate-800",
        "px-2",
        "py-1",
        "rounded",
      ],
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

interface TextProps 
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'code';
}

export function Text({ 
  variant, 
  align,
  as: Component = 'p',
  className = "", 
  ...props 
}: TextProps) {
  return (
    <Component
      className={textVariants({ variant, align, className })}
      {...props}
    />
  );
} 