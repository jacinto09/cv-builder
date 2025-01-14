import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2Icon className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}

export default LoadingButton;
