"use client";

import * as React from "react";
import { cn } from "@/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  text?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, htmlFor, text, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn("font-inter font-medium text-[13px] text-[#101010]", className)}
        {...props}
      >
        {text || children}
      </label>
    );
  }
);

Label.displayName = "Label";
