"use client";

import { useState } from "react";
import { RandomChat } from "@/components/chat/RandomChat";
import { GlobalChatRoom } from "@/components/chat/GlobalChatRoom";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { MessageSquare, Users, Radio, Sparkles, Heart } from "lucide-react";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<"random" | "global">("random");

  return (
    <div className="space-y-6 sm:space-y-7 animate-fadeIn max-w-3xl mx-auto">
      {/* Header Banner */}

      {/* Tabs Selector */}
      <div className="flex items-center justify-center p-1 bg-secondary rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("random")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "random"
              ? "bg-surface text-primary shadow-xs"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <Radio className="w-4 h-4 text-rose-500" />
          <span>Ghép Cặp 1-1 (Random)</span>
        </button>

        <button
          onClick={() => setActiveTab("global")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "global"
              ? "bg-surface text-primary shadow-xs"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <Users className="w-4 h-4 text-indigo-500" />
          <span>Phòng Chung (Lounge)</span>
        </button>
      </div>

      {/* Main Chat Screen */}
      <ScrollAnimation animation="fadeInUp" delay={100}>
        {activeTab === "random" ? <RandomChat /> : <GlobalChatRoom />}
      </ScrollAnimation>
    </div>
  );
}
