import React from "react";
import Link from "next/link";
import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "default",
  secondary: "secondary",
  simple: "outline",
  light: "secondary",
  dark: "default",
};

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
  xl: "xl",
};

const Button = React.forwardRef(
  (
    {
      size = "md",
      variant = "primary",
      type = "button",
      children,
      className,
      disabled = false,
      href,
      target,
      isBlock = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const shadcnVariant = variantMap[variant] || "default";
    const shadcnSize = sizeMap[size] || "default";
    const content = (
      <>
        {startIcon && <span className="[&_svg]:size-5">{startIcon}</span>}
        {children && <span>{children}</span>}
        {endIcon && <span className="[&_svg]:size-5">{endIcon}</span>}
      </>
    );
    const baseClass = cn(
      buttonVariants({ variant: shadcnVariant, size: shadcnSize }),
      isBlock && "w-full",
      className
    );
    if (href) {
      return (
        <Link
          href={href}
          className={baseClass}
          target={target}
          ref={ref}
        >
          {content}
        </Link>
      );
    }
    return (
      <ShadcnButton
        ref={ref}
        type={type}
        variant={shadcnVariant}
        size={shadcnSize}
        disabled={disabled}
        className={cn(isBlock && "w-full", className)}
        {...props}
      >
        {content}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";

export default Button;
