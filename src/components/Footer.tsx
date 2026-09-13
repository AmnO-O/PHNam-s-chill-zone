"use client";

import Link from "next/link";
import { Heart, Send, Music, BookOpen } from "lucide-react";

// Clean inline SVGs for brand icons
const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-bold text-text-primary text-base">
              Chill Zone
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Không gian cá nhân của Phạm Hữu Nam — nơi thư giãn, nghe nhạc
              và chia sẻ những câu chuyện đời thường.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-primary text-sm">
              Khám phá
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                href="/blog"
                className="text-sm text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Bài viết & Tản văn
              </Link>
              <Link
                href="/music"
                className="text-sm text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <Music className="w-3.5 h-3.5" />
                Music Lounge
              </Link>
              <Link
                href="/chat"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                Góc Trò Chuyện (Random & Lounge)
              </Link>
              <Link
                href="/about"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                Về Phạm Hữu Nam
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-primary text-sm">
              Kết nối
            </h4>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/pham.huu.nam.AmnOO/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-blue-50 dark:hover:bg-blue-950/40 text-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/AmnO-O"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-slate-200 dark:hover:bg-slate-700 text-text-secondary hover:text-text-primary transition-all"
                title="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://link-it.me/s/5d8034a4-c0bb-4e8c-84ed-2b6f29cbce12"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary hover:bg-rose-50 dark:hover:bg-rose-950/40 text-text-secondary hover:text-rose-500 transition-all"
                title="Gửi tin nhắn ẩn danh"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-tertiary">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in HCMC • © 2026 Phạm Hữu Nam</span>
          </div>
          <p className="text-xs text-text-tertiary">
            Chill Zone Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
