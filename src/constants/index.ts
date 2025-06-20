import { Monitor, Smartphone, Square, RectangleHorizontal } from "lucide-react";
import type { SizeOption, StyleOption } from "@/types";

// 风格修饰符映射
export const STYLE_MODIFIERS: Record<string, string> = {
  realistic: '高画质, 写实风格, 专业摄影',
  anime: '动漫风格, 日式插画, 精美绘画',
  artistic: '艺术风格, 油画质感, 创意插画',
  cyberpunk: '赛博朋克风格, 霓虹灯光, 未来科技',
  vintage: '复古风格, 胶片质感, 怀旧色调',
  minimalist: '极简主义, 简约设计, 干净构图',
  impressionist: '印象派画风, 朦胧质感, 光影效果',
  pop_art: '波普艺术, 明亮色彩, 图案设计',
  sketch: '素描风格, 铅笔画, 手绘线条',
  watercolor: '水彩画风, 透明质感, 柔和色彩',
  gothic: '哥特风格, 暗黑美学, 神秘氛围',
  fantasy: '奇幻风格, 魔法世界, 幻想生物'
};

// 尺寸选项
export const SIZE_OPTIONS: SizeOption[] = [
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

// 风格选项
export const STYLE_OPTIONS: StyleOption[] = [
  { value: "realistic", label: "写实风格", description: "照片级真实感" },
  { value: "anime", label: "动漫风格", description: "日式动漫插画" },
  { value: "artistic", label: "艺术风格", description: "油画水彩效果" },
  { value: "cyberpunk", label: "赛博朋克", description: "未来科幻霓虹风" },
  { value: "vintage", label: "复古风格", description: "怀旧胶片质感" },
  { value: "minimalist", label: "极简主义", description: "简约现代设计" },
  { value: "impressionist", label: "印象派", description: "朦胧梦幻艺术" },
  { value: "pop_art", label: "波普艺术", description: "明亮色彩图案" },
  { value: "sketch", label: "素描风格", description: "铅笔手绘效果" },
  { value: "watercolor", label: "水彩画", description: "透明水彩质感" },
  { value: "gothic", label: "哥特风格", description: "神秘暗黑美学" },
  { value: "fantasy", label: "奇幻风格", description: "魔法幻想世界" },
];

// 数量选项
export const COUNT_OPTIONS = [
  { value: 1, label: "1张图片" },
  { value: 2, label: "2张图片" },
  { value: 3, label: "3张图片" },
  { value: 4, label: "4张图片" },
];

// 本地存储键名
export const STORAGE_KEYS = {
  IMAGES: 'ai-image-generations',
  FAVORITES: 'ai-image-favorites',
} as const;

// API 配置
export const API_CONFIG = {
  MAX_RETRY_ATTEMPTS: 3,
  TIMEOUT: 30000, // 30秒
  MAX_STORED_IMAGES: 100,
} as const;

// 生成强度选项（用于以图生图）
export const STRENGTH_OPTIONS = {
  MIN: 0,
  MAX: 100,
  DEFAULT: 75,
  STEP: 5,
} as const;