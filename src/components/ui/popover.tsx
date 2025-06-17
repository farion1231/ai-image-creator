"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Popover({
  children,
  content,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom",
  className,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, setOpen]);

  const getPlacementClasses = () => {
    switch (placement) {
      case "top":
        return "bottom-full mb-2";
      case "left":
        return "right-full mr-2";
      case "right":
        return "left-full ml-2";
      default:
        return "top-full mt-2";
    }
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setOpen(!isOpen)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute z-50 min-w-[200px] rounded-lg border border-slate-200 bg-white p-4 shadow-lg",
            getPlacementClasses(),
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
