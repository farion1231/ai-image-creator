import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg shadow-sky-200/50 hover:from-sky-500 hover:to-blue-600",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-sky-200 bg-white/80 shadow-sm hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:border-sky-300 backdrop-blur-sm text-slate-700 hover:text-slate-800",
        secondary:
          "bg-gradient-to-r from-sky-100 to-blue-100 text-slate-700 shadow-sm hover:from-sky-200 hover:to-blue-200",
        ghost:
          "hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 text-slate-600 hover:text-slate-800",
        link: "text-sky-600 underline-offset-4 hover:underline hover:text-sky-700",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
