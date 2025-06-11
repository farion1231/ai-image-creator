# Docker 部署指南

## 安全的环境变量配置

### 方法 1：使用 .env.production 文件（推荐）

1. 创建 `.env.production` 文件（此文件已在 .gitignore 中被忽略）：

```bash
# .env.production
OPENAI_API_KEY=your_actual_openai_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

2. 使用 docker-compose 启动：

```bash
docker-compose up -d
```

### 方法 2：使用 docker-compose.override.yml

1. 创建 `docker-compose.override.yml` 文件（此文件已在 .gitignore 中被忽略）：

```yaml
version: "3.8"
services:
  ai-image-creator:
    environment:
      - OPENAI_API_KEY=your_actual_openai_api_key
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 方法 3：运行时传入环境变量

```bash
OPENAI_API_KEY=your_key docker-compose up -d
```

## 构建和运行

### 使用 Docker Compose（推荐）

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

### 使用纯 Docker

```bash
# 构建镜像
docker build -t ai-image-creator .

# 运行容器
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your_key \
  --name ai-image-creator \
  ai-image-creator
```

## 安全最佳实践

1. ✅ **永远不要**在 docker-compose.yml 中硬编码敏感信息
2. ✅ 使用 .env 文件或 docker-compose.override.yml 存储敏感信息
3. ✅ 确保 .env\* 和 docker-compose.override.yml 文件在 .gitignore 中
4. ✅ 在生产环境中使用 Docker secrets 或环境变量管理服务
5. ✅ 定期轮换 API 密钥

## 环境变量示例

创建你的 `.env.production` 文件时，可以参考以下模板：

```bash
# OpenAI 配置
OPENAI_API_KEY=sk-...your_key_here

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=production

# 可选配置
# DATABASE_URL=postgresql://...
# REDIS_URL=redis://...
# JWT_SECRET=your_jwt_secret
```
