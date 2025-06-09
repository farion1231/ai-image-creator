# 环境变量配置

要使用 AI 图片生成功能，你需要在项目根目录创建 `.env.local` 文件，并配置以下环境变量：

## 必需配置

```env
# OpenAI API 密钥
OPENAI_API_KEY=your_api_key_here

# API基础URL（如果使用第三方兼容OpenAI格式的API）
OPENAI_API_BASE_URL=https://api.openai.com/v1
```

## 配置说明

### OPENAI_API_KEY

- **必需**：是
- **说明**：你的 API 密钥
- **获取方式**：
  - 如果使用 OpenAI：从 https://platform.openai.com/api-keys 获取
  - 如果使用其他兼容 OpenAI 格式的第三方服务：从对应服务商获取

### OPENAI_API_BASE_URL

- **必需**：否（默认值：`https://api.openai.com/v1`）
- **说明**：API 基础 URL
- **使用场景**：
  - 使用第三方 API 服务时修改此 URL
  - 例如：`https://your-provider.com/v1`
  - 或者：`https://api.anthropic.com/v1`

## 配置步骤

1. 在项目根目录创建 `.env.local` 文件
2. 添加你的 API 配置
3. 重启开发服务器

```bash
npm run dev
```

## 安全注意事项

- ⚠️ **不要**将 `.env.local` 文件提交到 Git 仓库
- ⚠️ **不要**在客户端代码中暴露 API 密钥
- ✅ 所有 API 调用都在服务端进行，确保密钥安全

## AI SDK 集成

本项目已集成 **Vercel AI SDK**，提供以下增强功能：

### 安装的包

```bash
npm install ai @ai-sdk/openai
```

### AI SDK 功能

- **提示词智能优化**：AI 自动优化用户输入的提示词
- **智能错误分析**：提供详细的错误解决建议
- **负面提示词生成**：自动生成相关的负面提示词
- **提示词建议**：基于历史记录提供创意建议
- **图片内容分析**：分析生成图片的内容和质量

### 新增 API 端点

- `/api/optimize-prompt` - 提示词优化服务
- `/api/analyze-error` - 错误分析服务
- `/api/suggest-prompts` - 提示词建议服务

### 使用示例

在图片生成界面，你会看到一个 **"AI 优化"** 按钮，点击后可以：

1. 自动优化提示词的表达
2. 添加专业的艺术术语
3. 根据选择的风格调整描述
4. 提升生成图片的质量

## 测试配置

配置完成后，你可以：

1. 输入提示词
2. 点击"AI 优化"按钮测试 AI SDK 功能
3. 选择图片参数
4. 点击"开始创作"
5. 等待图片生成完成

如果配置正确，你将看到：

- 提示词优化功能正常工作
- 生成进度条
- 成功提示
- 图片显示在历史记录中

如果出现错误：

- 检查 API 密钥是否正确
- 检查网络连接
- 查看浏览器控制台的错误信息
- 确认 AI SDK 相关依赖已正确安装
