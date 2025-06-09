// AI SDK 提供商配置和工具函数
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// 提示词优化函数 - 使用AI SDK优化用户输入的提示词
export async function optimizePrompt(userPrompt: string, style: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'), // 使用较便宜的模型来优化提示词
      prompt: `请优化以下AI图片生成提示词，使其更具体、详细和专业。保持原意的同时，添加合适的技术术语和视觉描述。

原始提示词: "${userPrompt}"
期望风格: ${style}

优化后的提示词应该：
1. 保持原始创意意图
2. 添加技术细节（如光照、构图、质感等）
3. 使用专业的艺术术语
4. 适合${style}风格

请直接返回优化后的提示词，不要添加额外说明：`,
      maxTokens: 200,
    });
    
    return text.trim();
  } catch (error) {
    console.error('提示词优化失败:', error);
    // 如果优化失败，返回原始提示词
    return userPrompt;
  }
}

// 生成负面提示词
export async function generateNegativePrompt(mainPrompt: string, style: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `基于以下主要提示词和风格，生成适合的负面提示词（要避免的元素）：

主要提示词: "${mainPrompt}"
风格: ${style}

请生成一个负面提示词列表，用逗号分隔，包含：
- 质量相关的负面词（如：低质量、模糊、扭曲等）
- 风格不符的元素
- 常见的AI生成缺陷

直接返回负面提示词列表：`,
      maxTokens: 100,
    });
    
    return text.trim();
  } catch (error) {
    console.error('负面提示词生成失败:', error);
    // 返回默认的负面提示词
    return 'low quality, blurry, distorted, watermark, signature, text, bad anatomy';
  }
}

// 图片描述分析 - 分析生成的图片内容
export async function analyzeImage(imageUrl: string, originalPrompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `请分析这张根据提示词"${originalPrompt}"生成的图片，简要描述图片内容、风格特点和质量评估（50字以内）：`
            },
            {
              type: 'image',
              image: imageUrl,
            },
          ],
        },
      ],
      maxTokens: 100,
    });
    
    return text.trim();
  } catch (error) {
    console.error('图片分析失败:', error);
    return '图片分析暂不可用';
  }
}

// 提示词建议 - 基于历史记录和风格提供建议
export async function suggestPrompts(style: string, previousPrompts: string[] = []): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `基于${style}风格和以下历史提示词，生成5个新的创意提示词建议：

历史提示词示例:
${previousPrompts.slice(0, 5).map((p, i) => `${i + 1}. ${p}`).join('\n')}

请为${style}风格生成5个不同主题的提示词，每个一行，不要编号：`,
      maxTokens: 300,
    });
    
    return text.split('\n').filter(line => line.trim()).slice(0, 5);
  } catch (error) {
    console.error('提示词建议生成失败:', error);
    return [];
  }
}

// 错误消息智能分析
export async function analyzeError(errorMessage: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `分析以下AI图片生成错误信息，提供简洁的中文解决建议：

错误信息: "${errorMessage}"

请提供：
1. 可能的原因
2. 具体的解决建议
3. 预防措施

用简洁的中文回答（100字以内）：`,
      maxTokens: 150,
    });
    
    return text.trim();
  } catch (error) {
    console.error('错误分析失败:', error);
    return '请检查网络连接和API配置，或稍后重试。';
  }
} 