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

## 下一步计划

📋 **Phase 1.2 (第 2 周)**:

- [ ] 集成 Stable Diffusion API
- [ ] 实现真实的图片生成功能
- [ ] 添加生成进度显示
- [ ] 错误处理和重试机制

📋 **Phase 2 (第 3-4 周)**:

- [ ] 用户系统和认证
- [ ] 图片存储和管理
- [ ] 生成历史持久化
- [ ] 高级参数设置

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
