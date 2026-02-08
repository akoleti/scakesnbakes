import React from "react";
import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-16",
  md: "size-20",
  lg: "size-28",
};

function Avatar({ image, size = "md", alt, className }) {
  return (
    <ShadcnAvatar
      className={cn(
        sizeClasses[size],
        "border-2 border-border",
        className
      )}
    >
      <AvatarImage src={image} alt={alt} />
      <AvatarFallback className="text-muted-foreground">
        {alt ? alt.slice(0, 2).toUpperCase() : "?"}
      </AvatarFallback>
    </ShadcnAvatar>
  );
}

export default Avatar;
