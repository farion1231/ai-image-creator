import { Monitor, Smartphone, Square, RectangleHorizontal } from "lucide-react";
import type { SizeOption, StyleOption } from "./types";

export const sizeOptions: SizeOption[] = [
  // 正方形尺寸
  { value: "512x512", label: "512×512 (正方形)", icon: Square },
  { value: "1024x1024", label: "1024×1024 (正方形)", icon: Square },
  
  // 手机屏幕 (9:16 竖屏)
  { value: "576x1024", label: "576×1024 (手机竖屏)", icon: Smartphone },
  { value: "720x1280", label: "720×1280 (手机竖屏)", icon: Smartphone },
  
  // 宽屏 (16:9 横屏)
  { value: "1024x576", label: "1024×576 (宽屏)", icon: Monitor },
  { value: "1280x720", label: "1280×720 (宽屏)", icon: Monitor },
  { value: "1920x1080", label: "1920×1080 (全高清)", icon: Monitor },
  
  // 其他常用比例
  { value: "1024x768", label: "1024×768 (4:3)", icon: RectangleHorizontal },
  { value: "1152x896", label: "1152×896 (9:7)", icon: RectangleHorizontal },
];

export const styleOptions: StyleOption[] = [
  { value: "realistic", label: "写实风格", description: "照片级真实感" },
  { value: "anime", label: "动漫风格", description: "日式动漫插画" },
  { value: "artistic", label: "艺术风格", description: "油画水彩效果" },
]; 