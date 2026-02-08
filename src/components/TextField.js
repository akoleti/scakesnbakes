import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function setRef(ref, node) {
  if (ref == null) return;
  if (typeof ref === "function") ref(node);
  else ref.current = node;
}

const TextField = React.forwardRef(function TextField(
  { error, type = "text", size = "md", label, className, id, ...inputProps },
  forwardedRef
) {
  const { ref: registerRef, ...restInputProps } = inputProps;
  const inputId = id || restInputProps.name;
  const sizeClass = size === "sm" ? "h-8" : size === "lg" ? "h-11" : "";
  const Comp = type === "textarea" ? Textarea : Input;

  const mergedRef = useCallback(
    (node) => {
      setRef(forwardedRef, node);
      setRef(registerRef, node);
    },
    [forwardedRef, registerRef]
  );

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
        ref={mergedRef}
        {...restInputProps}
      />
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
});

export default TextField;
