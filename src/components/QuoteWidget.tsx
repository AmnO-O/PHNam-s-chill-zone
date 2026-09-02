"use client";

import { useState } from "react";
import { quotes } from "@/data/quotes";
import { Sparkles, RefreshCw, Copy, Check, Quote as QuoteIcon } from "lucide-react";

export function QuoteWidget() {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * quotes.length)
  );
  const [isFading, setIsFading] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentQuote = quotes[currentIndex];

  const handleNextQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * quotes.length);
      } while (nextIndex === currentIndex && quotes.length > 1);
      setCurrentIndex(nextIndex);
      setIsFading(false);
    }, 180);
  };

  const handleCopy = async () => {
    try {
      const textToCopy = `"${currentQuote.text}"\n— ${currentQuote.meaning}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const categoryLabels: Record<string, string> = {
    idiom: "Thành ngữ",
    life: "Chiêm nghiệm",
    motivation: "Động lực",
    love: "Tình cảm",
  };

  const categoryColors: Record<string, string> = {
    idiom: "bg-amber-500",
    life: "bg-emerald-500",
    motivation: "bg-blue-500",
    love: "bg-rose-500",
  };

  return (
    <div className="card rounded-2xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between h-full group">
      {/* Background ambient */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/8 dark:bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-sm sm:text-base">
                Góc Suy Ngẫm
              </h3>
              <span className="text-[11px] text-text-tertiary font-medium">
                Câu nói truyền cảm hứng
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-secondary transition-colors"
              title="Sao chép câu nói"
              aria-label="Sao chép câu nói vào clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-text-secondary">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  currentQuote.category
                    ? categoryColors[currentQuote.category] || "bg-slate-400"
                    : "bg-slate-400"
                }`}
              />
              {currentQuote.category
                ? categoryLabels[currentQuote.category] || "Danh ngôn"
                : "Danh ngôn"}
            </span>
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative my-2.5 py-1">
          <div
            className={`transition-all duration-150 ${
              isFading
                ? "opacity-0 translate-y-1"
                : "opacity-100 translate-y-0"
            }`}
          >
            <p className="text-sm sm:text-base font-semibold text-text-primary italic leading-snug">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            {currentQuote.meaning && (
              <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                {currentQuote.meaning}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 mt-auto border-t border-border flex items-center justify-between">
        <span className="text-[11px] text-text-tertiary font-mono">
          #{currentQuote.id}/{quotes.length}
        </span>
        <button
          onClick={handleNextQuote}
          disabled={isFading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95"
        >
          <RefreshCw className={`w-3 h-3 ${isFading ? "animate-spin" : ""}`} />
          <span>Câu khác</span>
        </button>
      </div>
    </div>
  );
}
