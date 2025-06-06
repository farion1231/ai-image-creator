import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 智能合并类名，使用 clsx 和 tailwind-merge 合并类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
