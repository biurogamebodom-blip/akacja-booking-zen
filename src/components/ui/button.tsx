import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-elevated hover:bg-primary/90 whitespace-nowrap",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90 whitespace-nowrap",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 whitespace-nowrap",
        ghost: "hover:bg-accent/10 hover:text-accent whitespace-nowrap",
        link: "text-accent underline-offset-4 hover:underline whitespace-nowrap",
        // Akacja custom variants - allow text wrap on mobile
        cta: "bg-accent text-accent-foreground shadow-elevated hover:shadow-glow hover:bg-accent/90 text-sm sm:text-base md:text-lg py-3 sm:py-4 px-4 sm:px-6 md:px-8 text-center",
        hero: "bg-gradient-to-r from-[hsl(180,55%,42%)] to-[hsl(210,50%,35%)] text-white shadow-glow hover:opacity-90 text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-10 font-bold tracking-wide text-center leading-tight",
        nav: "bg-transparent text-foreground hover:text-accent hover:bg-accent/5 font-medium whitespace-nowrap",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-auto min-h-[3rem] sm:min-h-[3.25rem] md:min-h-[3.5rem] rounded-lg px-4 sm:px-6 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
