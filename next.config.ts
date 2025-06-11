import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用standalone输出模式以优化Docker部署
  output: 'standalone',
};

export default nextConfig;
