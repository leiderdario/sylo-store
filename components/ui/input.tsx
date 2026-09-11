import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full bg-transparent border-0 border-b py-3 text-[15px] text-ivory-100 placeholder:text-stone-400 outline-none transition-colors",
        error ? "border-gold-400" : "border-white/14 focus:border-powder-300",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
