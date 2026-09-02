"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, MapPin, Coffee, BookOpen } from "lucide-react";

export function HomeHero() {
  const [greeting, setGreeting] = useState("Chúc bạn một ngày an yên!");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        setGreeting("Chào buổi sáng, chúc bạn ngày mới tràn đầy năng lượng! ☕");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Chào buổi chiều, nghỉ ngơi và thư giãn một chút nhé! 🌤️");
      } else {
        setGreeting("Chào buổi tối, chúc bạn một đêm bình yên và thư thái! 🌙");
      }

      setTimeStr(
        now.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-5 sm:p-7 md:p-8 animate-gradientShift">
      {/* Decorative ambient lighting */}
      <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 w-56 h-56 bg-indigo-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Chào mừng đến Chill Zone</span>
          </div>

          {timeStr && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-mono text-indigo-100">
              <MapPin className="w-3 h-3 text-rose-300" />
              <span>TP.HCM</span>
              <span className="text-white/30">•</span>
              <Clock className="w-3 h-3 text-amber-300" />
              <span>{timeStr}</span>
            </div>
          )}
        </div>

        {/* Main heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
          Thư Giãn, Lắng Nghe &{" "}
          <span className="gradient-text-warm">
            Trải Nghiệm.
          </span>
        </h1>

        {/* Dynamic greeting */}
        <p className="mt-2 text-xs sm:text-sm font-medium text-amber-200/95">
          {greeting}
        </p>

        {/* Description */}
        <p className="mt-2 text-indigo-100/85 text-xs sm:text-sm leading-relaxed max-w-lg">
          Không gian cá nhân của Nam để thả lỏng tâm trí sau giờ học tập
          và làm việc, cùng nghe nhạc chill và đọc những dòng tản văn.
        </p>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Link
            href="/music"
            className="px-4 py-2 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs sm:text-sm shadow-sm transition-all duration-150 active:scale-95 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
          >
            <Coffee className="w-4 h-4 text-indigo-600" />
            <span>Góc Âm Nhạc</span>
          </Link>

          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-150 active:scale-95 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Đọc Tản Văn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
