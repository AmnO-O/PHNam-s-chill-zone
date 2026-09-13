"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { getOrCreateUserId, setCustomUserName } from "@/lib/matchmaking";
import {
  Users,
  Send,
  Sparkles,
  MessageCircle,
  UserCheck,
  Edit2,
  Check,
  Clock,
  Info,
} from "lucide-react";

interface GlobalMessage {
  id: string;
  author_id: string;
  author_name: string;
  text: string;
  created_at: string;
}

// Format time from ISO string (or timestamp) to HH:MM
function formatTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

// Format relative date label for message grouping
function getDateLabel(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return "Vừa xong";
  if (hours < 24) return `${hours} giờ trước`;
  return date.toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" });
}

export function GlobalChatRoom() {
  const [userInfo, setUserInfo] = useState<{ id: string; name: string }>({
    id: "",
    name: "Bạn lạ",
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [messages, setMessages] = useState<GlobalMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [onlineCount, setOnlineCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [hasPrevMessages, setHasPrevMessages] = useState(false);

  const supabase = createClient();
  const channelRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Load messages from last 24h on mount
  useEffect(() => {
    const user = getOrCreateUserId();
    setUserInfo(user);
    setTempName(user.name);

    async function loadHistory() {
      setIsLoading(true);
      try {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { data, error } = await supabase
          .from("global_chat_messages")
          .select("*")
          .gte("created_at", since)
          .order("created_at", { ascending: true })
          .limit(100);

        if (!error && data && data.length > 0) {
          setMessages(data as GlobalMessage[]);
          setHasPrevMessages(true);
        }
      } catch {
        // If table doesn't exist yet, skip silently
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();

    // Setup Realtime channel
    const channel = supabase.channel("chill_global_lounge", {
      config: {
        presence: { key: user.id },
        broadcast: { self: false },
      },
    });

    channelRef.current = channel;

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const total = Object.keys(state).length;
        setOnlineCount(Math.max(1, total));
      })
      .on("broadcast", { event: "new_message" }, ({ payload }) => {
        // Add incoming message from another user
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.find((m) => m.id === payload.id)) return prev;
          return [...prev, payload as GlobalMessage];
        });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            userId: user.id,
            userName: user.name,
            onlineAt: Date.now(),
          });
        }
      });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus name input when editing
  useEffect(() => {
    if (isEditingName) {
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  }, [isEditingName]);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setCustomUserName(tempName.trim());
      setUserInfo((prev) => ({ ...prev, name: tempName.trim() }));
      setIsEditingName(false);

      if (channelRef.current) {
        channelRef.current.track({
          userId: userInfo.id,
          userName: tempName.trim(),
          onlineAt: Date.now(),
        });
      }
    } else {
      setIsEditingName(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const text = inputText.trim();
    setInputText("");
    setIsSending(true);

    const newMsg: GlobalMessage = {
      id: `g_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      author_id: userInfo.id,
      author_name: userInfo.name,
      text,
      created_at: new Date().toISOString(),
    };

    // Optimistic update — add to local state immediately
    setMessages((prev) => [...prev, newMsg]);

    // Broadcast to other users in real-time
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "new_message",
        payload: newMsg,
      });
    }

    // Persist to Supabase
    try {
      await supabase.from("global_chat_messages").insert([
        {
          id: newMsg.id,
          author_id: newMsg.author_id,
          author_name: newMsg.author_name,
          text: newMsg.text,
          created_at: newMsg.created_at,
        },
      ]);
    } catch {
      // If DB insert fails, message still visible in local state
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as any);
    }
  };

  // Group messages: show sender name only for first message in a run from same sender
  const isFirstInGroup = (idx: number) => {
    if (idx === 0) return true;
    return messages[idx].author_id !== messages[idx - 1].author_id;
  };

  return (
    <div className="card rounded-2xl overflow-hidden flex flex-col h-[580px] sm:h-[620px] border border-border bg-surface">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-surface/90 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-1.5 leading-tight">
              <span>Phòng Chung Chill Zone</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            </h2>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              {onlineCount} người đang online · Tin nhắn tồn tại 24h
            </p>
          </div>
        </div>

        {/* Nickname editor */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isEditingName ? (
            <div className="flex items-center gap-1">
              <input
                ref={nameInputRef}
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                maxLength={20}
                className="w-28 px-2 py-1 text-xs rounded-lg bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Biệt danh..."
              />
              <button
                onClick={handleSaveName}
                className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                aria-label="Lưu tên"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-secondary hover:bg-surface-hover text-xs font-medium text-text-secondary transition-colors"
              title="Đổi biệt danh"
            >
              <UserCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate max-w-[80px]">{userInfo.name}</span>
              <Edit2 className="w-2.5 h-2.5 opacity-50 shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* Previous messages notice */}
      {hasPrevMessages && !isLoading && (
        <div className="px-4 py-2 bg-indigo-500/5 border-b border-border/60 flex items-center gap-2 shrink-0">
          <Clock className="w-3 h-3 text-indigo-400 shrink-0" />
          <p className="text-[11px] text-text-tertiary">
            Hiển thị tin nhắn từ 24 giờ qua — tin nhắn cũ hơn sẽ tự xóa
          </p>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 px-4 py-3 overflow-y-auto bg-background/30 space-y-0.5">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
              <p className="text-[11px] text-text-tertiary">Đang tải lịch sử chat...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-3 px-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Chưa có ai nhắn gì</p>
                <p className="text-xs text-text-tertiary mt-1">Hãy là người đầu tiên mở đầu cuộc trò chuyện!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1 py-1">
            {messages.map((m, idx) => {
              const isMe = m.author_id === userInfo.id;
              const showName = !isMe && isFirstInGroup(idx);
              const showTime =
                idx === messages.length - 1 ||
                messages[idx + 1].author_id !== m.author_id ||
                new Date(messages[idx + 1].created_at).getTime() -
                  new Date(m.created_at).getTime() >
                  5 * 60 * 1000;

              return (
                <div key={m.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"} ${isFirstInGroup(idx) ? "mt-3" : "mt-0.5"}`}>
                  {showName && (
                    <span className="text-[10px] font-semibold text-text-tertiary px-1 mb-0.5">
                      {m.author_name}
                    </span>
                  )}
                  <div
                    className={`max-w-[78%] px-3.5 py-2 text-xs leading-relaxed break-words ${
                      isMe
                        ? "bg-primary text-white rounded-2xl rounded-br-sm"
                        : "bg-surface border border-border/70 text-text-primary rounded-2xl rounded-bl-sm shadow-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                  {showTime && (
                    <span className="text-[9px] text-text-tertiary px-1 mt-0.5">
                      {formatTime(m.created_at)}
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={sendMessage}
        className="p-3 border-t border-border bg-surface flex items-center gap-2 shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhắn gì đó vào phòng chung..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-text-primary placeholder:text-text-tertiary transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="p-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          aria-label="Gửi tin nhắn"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
