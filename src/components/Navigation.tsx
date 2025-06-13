"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Images } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/20 bg-gradient-to-r from-sky-50/90 via-blue-50/90 to-cyan-50/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900 transition-colors duration-200"
          >
            <div className="p-1.5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI 图片生成器
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105",
                pathname === "/"
                  ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg shadow-sky-200/50"
                  : "text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:shadow-md"
              )}
            >
              <Sparkles className="w-4 h-4" />
              创作
            </Link>
            <Link
              href="/gallery"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105",
                pathname === "/gallery"
                  ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg shadow-sky-200/50"
                  : "text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:shadow-md"
              )}
            >
              <Images className="w-4 h-4" />
              历史记录
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
