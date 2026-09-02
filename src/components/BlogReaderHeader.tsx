"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Share2, Check } from "lucide-react";

export function BlogReaderHeader() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Action Controls */}
      <div className="fixed bottom-8 right-6 z-40 flex flex-col items-center gap-3">
        <button
          onClick={handleShare}
          className="p-3 rounded-2xl glass-card text-text-primary hover:text-primary hover:border-primary/40 shadow-lg hover:scale-105 active:scale-95 transition-all"
          title="Chia sẻ bài viết"
          aria-label="Chia sẻ bài viết"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-500" />
          ) : (
            <Share2 className="w-5 h-5" />
          )}
        </button>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-primary text-white shadow-xl hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all animate-fadeIn"
            title="Cuộn lên đầu trang"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
}
