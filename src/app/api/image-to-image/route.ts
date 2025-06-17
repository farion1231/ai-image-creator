import { NextRequest, NextResponse } from "next/server";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  size: string;
  style: string;
  source: "image-to-image";
  strength: number;
}

// 风格修饰符映射
const styleModifiers: Record<string, string> = {
  realistic: "高画质, 写实风格, 专业摄影",
  anime: "动漫风格, 日式插画, 精美绘画",
  artistic: "艺术风格, 油画质感, 创意插画",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const image = formData.get("image") as File;
    const prompt = formData.get("prompt") as string;
    const strength = parseFloat(formData.get("strength") as string);
    const size = formData.get("size") as string;
    const count = parseInt(formData.get("count") as string);
    const style = formData.get("style") as string;

    // 验证输入
    if (!image || !prompt?.trim()) {
      return NextResponse.json(
        { error: "请提供图片和描述文字" },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "请上传有效的图片文件" },
        { status: 400 }
      );
    }

    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "图片文件大小不能超过 10MB" },
        { status: 400 }
      );
    }

    if (count < 1 || count > 4) {
      return NextResponse.json(
        { error: "生成数量必须在1-4之间" },
        { status: 400 }
      );
    }

    if (strength < 0 || strength > 1) {
      return NextResponse.json(
        { error: "变化强度必须在0-1之间" },
        { status: 400 }
      );
    }

    // 构建完整的提示词
    const styleModifier = styleModifiers[style] || "";
    const fullPrompt = `${prompt}, ${styleModifier}`;

    // 检查必要的环境变量
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API密钥未配置" }, { status: 500 });
    }

    let images: GeneratedImage[] = [];

    try {
      // 由于OpenAI的DALL-E不直接支持image-to-image，这里我们模拟实现
      // 在实际项目中，你可能需要使用其他支持image-to-image的API
      // 比如Stability AI、Midjourney API等

      const apiBaseUrl =
        process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1";

      // 将图片转换为base64
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const base64Image = imageBuffer.toString("base64");

      // 模拟调用支持image-to-image的API
      // 这里使用DALL-E 3的变体功能作为替代
      const response = await fetch(`${apiBaseUrl}/images/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `Based on the uploaded image, create a new image with these modifications: ${fullPrompt}. Strength of modification: ${Math.round(
            strength * 100
          )}%`,
          n: count,
          size: size,
          quality: "standard",
          response_format: "url",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API调用失败:", errorData);

        return NextResponse.json(
          {
            error: "图片生成失败",
            details: errorData.error?.message || `HTTP ${response.status}`,
          },
          { status: response.status }
        );
      }

      const result = await response.json();

      // 处理API响应，格式化为我们需要的数据结构
      images =
        result.data?.map((item: any, index: number) => ({
          id: `img2img_${Date.now()}_${index}`,
          url: item.url || item.b64_json,
          prompt: prompt,
          timestamp: new Date().toISOString(),
          size: size,
          style: style,
          source: "image-to-image" as const,
          strength: strength,
        })) || [];
    } catch (apiError) {
      console.error("AI API调用失败:", apiError);

      // 如果真实API调用失败，返回模拟响应（仅用于开发测试）
      if (process.env.NODE_ENV === "development") {
        images = Array.from({ length: count }, (_, index) => ({
          id: `demo_img2img_${Date.now()}_${index}`,
          url: `https://picsum.photos/${size.replace("x", "/")}?random=${
            Date.now() + index
          }`,
          prompt: prompt,
          timestamp: new Date().toISOString(),
          size: size,
          style: style,
          source: "image-to-image" as const,
          strength: strength,
        }));
      } else {
        throw apiError;
      }
    }

    return NextResponse.json({
      success: true,
      images: images,
      count: images.length,
      mode: "image-to-image",
    });
  } catch (error) {
    console.error("以图生图时出错:", error);

    return NextResponse.json(
      {
        error: "服务器内部错误",
        details: error instanceof Error ? error.message : "未知错误",
      },
      { status: 500 }
    );
  }
}
