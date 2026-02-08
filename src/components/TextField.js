import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const TextField = React.forwardRef(function TextField(
  { error, type = "text", size = "md", label, className, id, ...inputProps },
  ref
) {
  const inputId = id || inputProps.name;
  const sizeClass = size === "sm" ? "h-8" : size === "lg" ? "h-11" : "";
  const Comp = type === "textarea" ? Textarea : Input;
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label htmlFor={inputId} className="mb-1.5 block font-medium">
          {label}
        </Label>
      )}
      <Comp
        id={inputId}
        className={sizeClass}
        type={type === "textarea" ? undefined : type}
        ref={ref}
        {...inputProps}
      />
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
});

export default TextField;
