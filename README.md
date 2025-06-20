# AI 图片生成器

一个基于 Next.js 15 的现代化 AI 图片生成应用，支持文本生图和以图生图两种模式，集成智能提示词优化、错误分析等 AI 增强功能。

## ✨ 功能特色

### 🎨 双模式生成
- **文本生图**: 通过描述文字创作全新图片
- **以图生图**: 基于参考图片进行创意变换，支持变化强度调节

### 🤖 AI 智能增强
- **提示词优化**: 使用 GPT-4o-mini 自动优化用户输入，添加专业艺术术语
- **智能错误分析**: AI 分析错误信息并提供中文友好的解决方案
- **创意建议**: 基于历史记录生成个性化提示词建议
- **图片内容分析**: 自动分析生成图片的内容和质量

### 🖼️ 图片管理
- **本地存储**: 自动保存生成历史，支持搜索和筛选
- **收藏功能**: 标记喜爱的图片，便于管理
- **批量下载**: 支持图片下载和批量操作
- **多种尺寸**: 支持正方形、宽屏、手机屏幕等多种比例

### 🎨 丰富的艺术风格
支持 12 种艺术风格：写实、动漫、艺术、赛博朋克、复古、极简、印象派、波普艺术、素描、水彩、哥特、奇幻

## 🛠️ 技术栈

- **前端框架**: Next.js 15 + TypeScript + React 19
- **UI 组件**: shadcn/ui + Tailwind CSS v4
- **AI 集成**: Vercel AI SDK + @ai-sdk/openai
- **图标库**: Lucide React
- **状态管理**: React Hooks + 本地存储
- **构建工具**: Turbopack (开发) + Next.js (生产)

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装与启动

1. **克隆项目**
```bash
git clone <repository-url>
cd ai-image-creator
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local 添加以下配置
OPENAI_API_KEY=your-openai-api-key
OPENAI_API_BASE_URL=https://api.openai.com/v1  # 可选，自定义API地址
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建生产版本
```bash
npm run build
npm start
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── generate/      # 文本生图接口
│   │   ├── image-to-image/    # 以图生图接口
│   │   └── optimize-prompt/   # 提示词优化接口
│   ├── gallery/           # 图片库页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 主页
├── components/            # React 组件
│   ├── image-generator/   # 图片生成组件
│   ├── image-gallery/     # 图片库组件
│   ├── ui/               # 基础 UI 组件
│   └── Navigation.tsx    # 导航组件
├── constants/             # 全局常量配置
├── lib/                   # 工具库
│   ├── ai-config.ts      # AI 配置
│   ├── ai-providers.ts   # AI 服务提供商
│   ├── storage.ts        # 本地存储管理
│   └── utils.ts          # 通用工具函数
└── types/                 # TypeScript 类型定义
    ├── index.ts          # 核心类型
    └── api.ts            # API 类型
```

## 🔧 可用脚本

- `npm run dev` - 启动开发服务器（使用 Turbopack）
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 代码检查

## ⚙️ 配置说明

### 环境变量
| 变量名 | 必需 | 说明 |
|--------|------|------|
| `OPENAI_API_KEY` | ✅ | OpenAI API 密钥，用于图片生成和 AI 功能 |
| `OPENAI_API_BASE_URL` | ❌ | 自定义 OpenAI API 基础 URL，默认为官方地址 |

### AI 模型配置
- **文本优化**: GPT-4o-mini (性价比优化)
- **图片分析**: GPT-4o (高质量分析)
- **错误分析**: GPT-4o-mini (快速响应)

## 🎯 使用指南

### 文本生图
1. 选择"文本生图"标签页
2. 输入描述文字（支持中英文）
3. 选择艺术风格、尺寸和生成数量
4. 点击"生成图片"按钮

### 以图生图
1. 选择"以图生图"标签页
2. 拖拽或点击上传参考图片
3. 输入变化描述和调节变化强度
4. 选择风格和参数，开始生成

### 智能功能
- **提示词优化**: 生成时自动优化描述文字
- **错误恢复**: 失败时提供智能建议
- **历史管理**: 在"图片库"页面查看和管理历史

## 🏗️ 架构特点

### 类型安全
- 完整的 TypeScript 类型定义
- 统一的类型管理和导出
- 严格的 ESLint 规则

### 模块化设计
- 组件化架构，职责分离清晰
- 统一的常量和配置管理
- 可复用的 hooks 和工具函数

### 性能优化
- React 19 + Next.js 15 最新特性
- 本地存储减少 API 调用
- 组件懒加载和错误边界

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [shadcn/ui](https://ui.shadcn.com/) - 现代 UI 组件库
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 开发工具包
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide React](https://lucide.dev/) - 图标库