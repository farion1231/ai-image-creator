import { Monitor, Smartphone } from "lucide-react";
import type { SizeOption, StyleOption } from "./types";

export const sizeOptions: SizeOption[] = [
  { value: "512x512", label: "512×512", icon: Smartphone },
  { value: "768x768", label: "768×768", icon: Monitor },
  { value: "1024x1024", label: "1024×1024", icon: Monitor },
];

export const styleOptions: StyleOption[] = [
  { value: "realistic", label: "写实风格", description: "照片级真实感" },
  { value: "anime", label: "动漫风格", description: "日式动漫插画" },
  { value: "artistic", label: "艺术风格", description: "油画水彩效果" },
]; 