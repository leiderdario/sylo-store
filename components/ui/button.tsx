import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.06em] rounded-[2px] transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-powder-300",
  {
    variants: {
      variant: {
        primary: "bg-ivory-100 text-navy-950 hover:bg-gold-400",
        line: "border border-current bg-transparent hover:bg-white/8",
        ghost:
          "normal-case font-semibold tracking-normal border-b border-current pb-0.5 rounded-none",
      },
      size: {
        default: "px-[30px] py-[15px]",
        sm: "px-5 py-2.5 text-[12px]",
        icon: "h-[38px] w-[38px] p-0 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
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
