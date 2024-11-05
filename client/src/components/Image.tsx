import { cva, type VariantProps } from "class-variance-authority";
import { ImgHTMLAttributes } from "react";

const imageVariants = cva(["transition-all"], {
  variants: {
    variant: {
      logo: [
        "h-24",
        "p-6",
      ],
      avatar: [
        "h-12",
        "w-12",
        "rounded-full",
        "object-cover",
      ],
      banner: [
        "w-full",
        "h-48",
        "object-cover",
        "rounded-lg",
      ],
    },
    hover: {
      glow: "hover:drop-shadow-[0_0_2em_#646cffaa]",
      spin: "motion-safe:animate-[spin_20s_linear_infinite]",
      scale: "hover:scale-105",
    },
  },
  defaultVariants: {
    variant: "logo",
  },
});

interface ImageProps 
  extends ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {}

export function Image({ 
  variant, 
  hover,
  className = "", 
  ...props 
}: ImageProps) {
  return (
    <img
      className={imageVariants({ variant, hover, className })}
      {...props}
    />
  );
} 