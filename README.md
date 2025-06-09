# AI 图片生成器

一个基于 Next.js + shadcn/ui 的现代化 AI 图片生成应用，采用活泼舒适的设计风格。

## 技术栈

- **前端框架**: Next.js 15 + TypeScript
- **UI 组件库**: shadcn/ui
- **样式**: Tailwind CSS v4
- **图标**: Lucide React
- **字体**: Inter

## 设计特色

- 🎨 活泼舒适的视觉风格
- 💙 淡蓝色系主题色调
- 🌟 柔和的圆角和阴影效果
- 📱 完全响应式设计

## 当前进展 (Phase 1.1)

✅ **已完成**:

- [x] Next.js 项目搭建
- [x] shadcn/ui 组件库集成
- [x] 基础页面布局设计
- [x] 活泼舒适的 UI 主题定制
- [x] 图片生成器组件 (ImageGenerator)
- [x] 图片历史组件 (ImageGallery)
- [x] 响应式布局实现

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                # Next.js App Router
│   ├── globals.css    # 全局样式和主题
│   ├── layout.tsx     # 根布局
│   └── page.tsx       # 主页
├── components/         # React 组件
│   ├── ui/            # shadcn/ui 基础组件
│   ├── ImageGenerator.tsx  # 图片生成器
│   └── ImageGallery.tsx    # 历史记录
└── lib/               # 工具函数
    └── utils.ts       # 通用工具
```

📋 **Phase 1.2 (第 2 周)** - ✅ 已完成:

- [x] 集成第三方 OpenAI 格式 API
- [x] 实现真实的图片生成功能
- [x] 添加生成进度显示
- [x] 错误处理和重试机制
- [x] 本地存储生成历史
- [x] 图片下载和管理功能

📋 **Phase 1.3 (AI SDK 集成)** - ✅ 已完成:

- [x] 集成 Vercel AI SDK
- [x] 提示词智能优化功能
- [x] AI 驱动的错误分析
- [x] 智能提示词建议
- [x] 图片内容分析功能
- [x] 优化用户体验和交互

## AI SDK 增强功能

### 🤖 智能提示词优化

- 使用 GPT-4o-mini 自动优化用户输入
- 添加专业艺术术语和技术细节
- 根据选择风格调整描述
- 提升生成图片质量

### 🔍 智能错误分析

- AI 分析错误信息并提供解决方案
- 中文友好的错误提示
- 具体的解决步骤和预防措施

### 💡 创意提示词建议

- 基于历史记录和风格生成建议
- 多样化的主题创意
- 个性化推荐系统

### 🖼️ 图片内容分析

- 自动分析生成图片内容
- 质量评估和风格描述
- 与原始提示词的匹配度分析

## 技术栈更新

- **AI SDK**: Vercel AI SDK + @ai-sdk/openai
- **AI 模型**: GPT-4o (图片分析) + GPT-4o-mini (文本优化)
- **增强功能**: 智能提示词处理、错误分析、内容理解

## 下一步计划

📋 **Phase 2 (第 3-4 周)**:

- [ ] 用户系统和认证
- [ ] 云端图片存储和管理
- [ ] 高级 AI 功能 (多模态、批量处理)
- [ ] 社区功能和分享机制

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
