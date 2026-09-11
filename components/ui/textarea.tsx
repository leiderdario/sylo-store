import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={5}
      className={cn(
        "w-full bg-transparent border-0 border-b py-3 text-[15px] text-ivory-100 placeholder:text-stone-400 outline-none transition-colors resize-none",
        error ? "border-gold-400" : "border-white/14 focus:border-powder-300",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
