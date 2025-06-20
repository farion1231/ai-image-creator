# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作提供指导。
使用中文输出。

## 开发命令

### 核心开发命令

- `npm run dev` - 启动开发服务器（使用 Turbopack，运行在 http://localhost:3000）
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 代码检查

### 必需的环境变量

- `OPENAI_API_KEY` - OpenAI API 密钥，用于 AI 服务
- `OPENAI_API_BASE_URL` - 可选的自定义 OpenAI API 基础 URL

## 架构概览

这是一个基于 Next.js 15 的 AI 图片生成应用，具有双模式生成功能：

### 核心 AI 集成

- **AI SDK**: 使用 Vercel AI SDK (@ai-sdk/openai) 进行文本处理
- **模型**: GPT-4o 用于图片分析，GPT-4o-mini 用于文本优化
- **图片生成**: 兼容 OpenAI 的 API，实现 GPT-4o 风格的图片生成
- **智能功能**: 提示词优化、错误分析、内容分析

### 关键架构模式

**双生成模式**:

- 文本生图：直接通过文本提示词生成
- 以图生图：上传参考图片，可控制变化强度（0-100%）

**AI 服务层** (`src/lib/ai-providers.ts`):

- `optimizePrompt()` - 用专业术语增强用户提示词
- `generateNegativePrompt()` - 自动生成质量排除提示词
- `analyzeImage()` - GPT-4o 驱动的图片内容分析
- `suggestPrompts()` - 基于历史记录的创意提示词建议
- `analyzeError()` - 智能错误信息翻译

**组件架构**:

- `ImageGenerator` - 主要生成界面，带有文本/图片标签页模式
- `ImageGallery` - 基于本地存储的历史记录，支持搜索和管理
- 基于弹窗的设置系统，用于风格、尺寸和生成参数

**API 路由**:

- `/api/generate` - 文本生图
- `/api/image-to-image` - 以图生图转换
- `/api/optimize-prompt` - 提示词增强端点

### 状态管理

- 自定义 hooks：`useImageGeneration`、`useImageToImageGeneration`、`useImageGallery`
- 本地存储用于图片历史和用户偏好
- 实时进度跟踪和重试机制

### UI/UX 设计

- shadcn/ui 组件库，带有自定义主题
- Tailwind CSS v4，采用柔和的蓝色配色方案
- 响应式设计，移动端优先
- 拖拽式图片上传界面

## 关键实现要点

**AI 配置** (`src/lib/ai-config.ts`):

- 集中化的模型和令牌限制配置
- 环境变量验证工具
- 重试和超时设置

**图片处理**:

- 文件上传处理和预览生成
- Base64 编码用于 API 传输
- 渐进式图片加载和优化

**错误处理**:

- AI 驱动的错误分析，支持中文本地化
- AI 服务失败时的优雅降级
- 指数退避重试机制
