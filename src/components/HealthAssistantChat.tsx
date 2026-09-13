"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  X,
  RefreshCw,
  Droplets,
  Bookmark,
  Activity,
  ChevronRight,
  HeartPulse,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface SuggestedAction {
  label: string;
  type: string;
  icon?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  suggested_actions?: SuggestedAction[];
  quick_replies?: string[];
  timestamp: string;
}

export function HealthAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Chào bạn! Mình là Vitalis, trợ lý sức khoẻ và thói quen lành mạnh. Hôm nay bạn cảm thấy cơ thể thế nào? Bạn có thể hỏi mình về chế độ uống nước, giấc ngủ hoặc dinh dưỡng nhé! ✨",
      quick_replies: [
        "Mỗi ngày nên uống bao nhiêu nước?",
        "Mẹo ngủ sâu giấc hơn?",
        "Cách giảm mỏi mắt khi học tập?",
      ],
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Load chat history from Supabase if configured
  useEffect(() => {
    async function loadHistory() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("health_chat_messages")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(20);

        if (!error && data && data.length > 0) {
          const formatted: ChatMessage[] = data.map((item: any) => ({
            id: String(item.id),
            sender: item.sender,
            text: item.text,
            timestamp: new Date(item.created_at).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          setMessages(formatted);
        }
      } catch {
        // Safe fallback
      }
    }
    loadHistory();
  }, []);

  const saveToSupabase = async (sender: "user" | "assistant", text: string) => {
    try {
      const supabase = createClient();
      await supabase.from("health_chat_messages").insert([{ sender, text }]);
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    saveToSupabase("user", messageText);

    // Build payload with string-only history to satisfy backend schema
    const historyPayload = messages.slice(-6).map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      content: m.text,
    }));

    try {
      // Try local Next.js proxy route first (avoids CORS issues)
      let responseText = "";
      let actions: SuggestedAction[] = [];
      let replies: string[] = [];

      try {
        const res = await fetch("/api/health-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageText,
            history: historyPayload,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          responseText = data.response || data.message || "";
          actions = data.suggested_actions || [];
          replies = data.quick_replies || [];
        }
      } catch {
        // Fallback directly to backend
      }

      // If proxy didn't return text, call backend directly
      if (!responseText) {
        const directRes = await fetch(
          "https://vitalis-backend-zl85.onrender.com/api/v1/ai/chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: messageText,
              history: historyPayload,
            }),
          }
        );

        if (directRes.ok) {
          const data = await directRes.json();
          responseText = data.response || data.message || "";
          actions = data.suggested_actions || [];
          replies = data.quick_replies || [];
        }
      }

      if (!responseText) {
        responseText =
          "Mình đã ghi nhận câu hỏi. Có vẻ máy chủ đang xử lý dữ liệu, bạn vui lòng gửi lại câu hỏi sau giây lát nhé!";
      }

      const botMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        sender: "assistant",
        text: responseText,
        suggested_actions: actions,
        quick_replies: replies,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
      saveToSupabase("assistant", responseText);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: "assistant",
        text: "Hiện tại kết nối AI đang khởi động lại. Bạn hãy thử lại sau vài giây nhé!",
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format text with simple markdown (bold and bullets)
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold handling: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-bold text-text-primary">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1">
            <span className="text-emerald-500 font-bold">•</span>
            <span>{formattedLine}</span>
          </div>
        );
      }

      return line.trim() === "" ? (
        <div key={idx} className="h-2" />
      ) : (
        <p key={idx} className="leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Human, elegant floating button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-surface/90 hover:bg-surface border border-border/80 text-text-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all backdrop-blur-md"
            aria-label="Mở Trợ lý Sức khoẻ"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold leading-tight flex items-center gap-1">
                <span>Vitalis AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[10px] text-text-tertiary leading-none mt-0.5">
                Trợ lý sức khoẻ
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-50 w-[94vw] sm:w-[380px] h-[520px] max-h-[86vh] bg-surface border border-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-border bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-indigo-50/30 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-indigo-950/10 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-text-primary flex items-center gap-1.5 leading-tight">
                  <span>Vitalis Health</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    AI
                  </span>
                </h3>
                <p className="text-[10px] text-text-tertiary flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Sẵn sàng lắng nghe & tư vấn
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-secondary text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Đóng chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-secondary/20 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl p-3 leading-relaxed transition-all ${
                    m.sender === "user"
                      ? "bg-primary text-white rounded-br-none shadow-xs"
                      : "bg-surface border border-border/80 text-text-secondary rounded-bl-none shadow-xs"
                  }`}
                >
                  <div className="space-y-1">{renderFormattedText(m.text)}</div>

                  {/* Suggested actions from Vitalis */}
                  {m.suggested_actions && m.suggested_actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-border/50 flex flex-wrap gap-1.5">
                      {m.suggested_actions.map((act, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]"
                        >
                          <Droplets className="w-3 h-3" />
                          <span>{act.label}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Replies */}
                  {m.quick_replies && m.quick_replies.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-border/50 flex flex-wrap gap-1">
                      {m.quick_replies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(reply)}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all text-text-secondary border border-border/60 flex items-center gap-1 active:scale-95"
                        >
                          <span>{reply}</span>
                          <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1.5 ${
                      m.sender === "user"
                        ? "text-indigo-100 text-right"
                        : "text-text-tertiary text-left"
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-text-tertiary text-[11px] pl-1 py-1">
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-500" />
                <span>Vitalis đang tổng hợp câu trả lời...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 border-t border-border bg-surface flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Hỏi về sức khoẻ, uống nước, giấc ngủ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-secondary/80 border border-border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-text-primary placeholder:text-text-tertiary transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
