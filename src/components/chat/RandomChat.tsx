"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { getOrCreateUserId, ChatMessage } from "@/lib/matchmaking";
import {
  Users,
  Search,
  Send,
  X,
  RefreshCw,
  Sparkles,
  Heart,
  Smile,
  ShieldCheck,
  Radio,
  DoorOpen,
} from "lucide-react";

type MatchStatus = "idle" | "searching" | "connected" | "partner_left";

export function RandomChat() {
  const [userInfo, setUserInfo] = useState<{ id: string; name: string }>({
    id: "",
    name: "Bạn lạ",
  });
  const [matchStatus, setMatchStatus] = useState<MatchStatus>("idle");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState<string>("Người lạ");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [onlineWaiters, setOnlineWaiters] = useState(0);

  const supabase = createClient();
  const lobbyChannelRef = useRef<any>(null);
  const roomChannelRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const user = getOrCreateUserId();
    setUserInfo(user);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, partnerTyping]);

  // Clean up channels on unmount
  useEffect(() => {
    return () => {
      leaveAllChannels();
    };
  }, []);

  const leaveAllChannels = () => {
    if (roomChannelRef.current) {
      roomChannelRef.current.send({
        type: "broadcast",
        event: "partner_leave",
        payload: {},
      });
      supabase.removeChannel(roomChannelRef.current);
      roomChannelRef.current = null;
    }
    if (lobbyChannelRef.current) {
      supabase.removeChannel(lobbyChannelRef.current);
      lobbyChannelRef.current = null;
    }
  };

  // Start Searching / Matchmaking
  const startSearching = () => {
    leaveAllChannels();
    setMatchStatus("searching");
    setMessages([]);
    setRoomId(null);
    setPartnerName("Người lạ");

    const lobby = supabase.channel("chill_matchmaking_lobby", {
      config: { presence: { key: userInfo.id } },
    });

    lobbyChannelRef.current = lobby;

    lobby
      .on("presence", { event: "sync" }, () => {
        const state = lobby.presenceState();
        const usersInQueue: Array<{ userId: string; userName: string }> = [];

        Object.keys(state).forEach((key) => {
          const presences = state[key] as any[];
          presences.forEach((p) => {
            if (p.userId !== userInfo.id && p.status === "searching") {
              usersInQueue.push({ userId: p.userId, userName: p.userName });
            }
          });
        });

        setOnlineWaiters(usersInQueue.length);

        // If someone else is waiting, initiate match if our ID is lexicographically smaller to prevent duplicate creation
        if (usersInQueue.length > 0) {
          const partner = usersInQueue[0];
          if (userInfo.id < partner.userId) {
            const newRoomId = `room_${Math.random().toString(36).substring(2, 9)}`;
            // Send match invitation via broadcast
            lobby.send({
              type: "broadcast",
              event: "match_found",
              payload: {
                targetUserId: partner.userId,
                creatorUserId: userInfo.id,
                creatorName: userInfo.name,
                roomId: newRoomId,
              },
            });

            connectToRoom(newRoomId, partner.userName);
          }
        }
      })
      .on("broadcast", { event: "match_found" }, ({ payload }) => {
        if (payload.targetUserId === userInfo.id) {
          connectToRoom(payload.roomId, payload.creatorName || "Người lạ");
        }
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await lobby.track({
            userId: userInfo.id,
            userName: userInfo.name,
            status: "searching",
            joinedAt: Date.now(),
          });
        }
      });
  };

  // Connect to matched private room
  const connectToRoom = (activeRoomId: string, partnerDisplayName: string) => {
    // Leave matchmaking lobby
    if (lobbyChannelRef.current) {
      supabase.removeChannel(lobbyChannelRef.current);
      lobbyChannelRef.current = null;
    }

    setRoomId(activeRoomId);
    setPartnerName(partnerDisplayName);
    setMatchStatus("connected");

    const room = supabase.channel(`chill_chat_${activeRoomId}`, {
      config: { broadcast: { self: false } },
    });

    roomChannelRef.current = room;

    room
      .on("broadcast", { event: "message" }, ({ payload }) => {
        setMessages((prev) => [...prev, payload]);
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        setPartnerTyping(payload.isTyping);
      })
      .on("broadcast", { event: "partner_leave" }, () => {
        setMatchStatus("partner_left");
      })
      .subscribe();
  };

  // Send a message
  const sendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !roomChannelRef.current || matchStatus !== "connected") return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      senderId: userInfo.id,
      senderName: userInfo.name,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    roomChannelRef.current.send({
      type: "broadcast",
      event: "message",
      payload: newMsg,
    });

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Clear typing indicator
    if (roomChannelRef.current) {
      roomChannelRef.current.send({
        type: "broadcast",
        event: "typing",
        payload: { isTyping: false },
      });
    }
  };

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);

    if (roomChannelRef.current && matchStatus === "connected") {
      if (!isTyping) {
        setIsTyping(true);
        roomChannelRef.current.send({
          type: "broadcast",
          event: "typing",
          payload: { isTyping: true },
        });
      }

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        roomChannelRef.current?.send({
          type: "broadcast",
          event: "typing",
          payload: { isTyping: false },
        });
      }, 1500);
    }
  };

  // Leave current conversation
  const leaveChat = () => {
    leaveAllChannels();
    setMatchStatus("idle");
    setRoomId(null);
    setMessages([]);
  };

  return (
    <div className="card rounded-2xl overflow-hidden flex flex-col h-[560px] sm:h-[600px] border border-border bg-surface">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-1.5">
              <span>Ghép Cặp Ngẫu Nhiên 1-1</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </h2>
            <p className="text-[11px] text-text-tertiary">
              {matchStatus === "connected"
                ? `Đang trò chuyện với: ${partnerName}`
                : matchStatus === "searching"
                ? "Đang tìm kiếm bạn cùng tần số..."
                : "Kết nối ngẫu nhiên 2 người lạ đang truy cập"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {matchStatus === "connected" && (
            <>
              <button
                onClick={startSearching}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-surface-hover text-xs font-semibold text-text-primary transition-all active:scale-95"
                title="Bỏ qua và tìm người khác"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Người khác</span>
              </button>
              <button
                onClick={leaveChat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-semibold transition-all active:scale-95"
                title="Rời phòng chat"
              >
                <DoorOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rời</span>
              </button>
            </>
          )}

          {matchStatus === "searching" && (
            <button
              onClick={leaveChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-surface-hover text-xs font-semibold text-text-secondary transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>Huỷ tìm</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Area */}
      {matchStatus === "idle" && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-float">
            <Users className="w-8 h-8" />
          </div>

          <div className="max-w-sm space-y-1.5">
            <h3 className="font-extrabold text-lg text-text-primary">
              Trò Chuyện Ẩn Danh
            </h3>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={startSearching}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Bắt đầu ghép cặp</span>
            </button>
          </div>

        </div>
      )}

      {matchStatus === "searching" && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RefreshCw className="w-7 h-7 animate-spin" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-surface animate-ping" />
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-sm text-text-primary">
              Đang dò tìm người lạ =))
            </h3>
            <p className="text-xs text-text-tertiary">
              Hãy đợi trong giây lát khi có người khác bấm tìm kiếm nhé!
            </p>
          </div>

          <button
            onClick={leaveChat}
            className="px-4 py-1.5 rounded-xl bg-secondary text-xs text-text-secondary hover:text-text-primary"
          >
            Dừng tìm kiếm
          </button>
        </div>
      )}

      {(matchStatus === "connected" || matchStatus === "partner_left") && (
        <>
          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background/40 text-xs">
            {/* System banner */}
            <div className="text-center py-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-text-tertiary text-[11px]">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Đã ghép cặp thành công với {partnerName}. Hãy gửi lời chào nhé!</span>
              </span>
            </div>

            {messages.map((m) => {
              const isMe = m.senderId === userInfo.id;
              return (
                <div
                  key={m.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl p-3 leading-relaxed ${
                      isMe
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-surface border border-border text-text-primary rounded-bl-none shadow-xs"
                    }`}
                  >
                    {!isMe && (
                      <span className="block text-[10px] font-bold text-text-tertiary mb-1">
                        {m.senderName}
                      </span>
                    )}
                    <p className="break-words">{m.text}</p>
                    <span
                      className={`block text-[9px] mt-1 ${
                        isMe ? "text-indigo-100 text-right" : "text-text-tertiary text-left"
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {partnerTyping && (
              <div className="flex items-center gap-1.5 text-text-tertiary text-[11px] italic pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200" />
                <span>{partnerName} đang soạn tin nhắn...</span>
              </div>
            )}

            {matchStatus === "partner_left" && (
              <div className="card text-center py-4 rounded-xl border border-rose-500/20 bg-rose-500/5 my-3">
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {partnerName} đã rời khỏi cuộc trò chuyện.
                </p>
                <button
                  onClick={startSearching}
                  className="mt-2 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Tìm người khác</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          {matchStatus === "connected" && (
            <form
              onSubmit={sendMessage}
              className="p-3 border-t border-border bg-surface flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Nhập tin nhắn tâm sự..."
                value={inputText}
                onChange={handleInputChange}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-tertiary"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Gửi"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
