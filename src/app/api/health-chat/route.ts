import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://vitalis-backend-zl85.onrender.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Vui lòng nhập nội dung câu hỏi." },
        { status: 400 }
      );
    }

    // Format history strictly as required by backend schema: array of { [key: string]: string }
    const formattedHistory = Array.isArray(history)
      ? history
          .filter((item: any) => item && typeof item.content === "string")
          .map((item: any) => ({
            role: item.role === "assistant" ? "model" : "user",
            content: String(item.content).slice(0, 1000),
          }))
          .slice(-6)
      : [];

    const payload = {
      message: message.trim(),
      history: formattedHistory,
    };

    const res = await fetch(`${BACKEND_URL}/api/v1/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Vitalis backend error:", res.status, errorText);
      return NextResponse.json(
        {
          response:
            "Trợ lý AI đang cập nhật dữ liệu. Bạn vui lòng thử lại câu hỏi nhé!",
          status: "fallback",
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Health chat proxy error:", error);
    return NextResponse.json(
      {
        response:
          "Hệ thống đang kết nối lại với máy chủ trợ lý sức khoẻ. Bạn thử lại sau vài giây nhé!",
        status: "error",
      },
      { status: 200 }
    );
  }
}
