import React from "react";
import { cn } from "@/lib/utils";

function FormAlert({ type, message }) {
  return (
    <div
      className={cn(
        "text-center rounded-md border p-4 text-sm",
        type === "error" && "border-destructive/50 bg-destructive/10 text-destructive",
        type === "success" && "border-primary/30 bg-primary/10 text-primary"
      )}
    >
      {message}
    </div>
  );
}

export default FormAlert;
