import Link from "next/link";
import Image from "next/image";
import { Home, BookOpen, Music, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-8 animate-fadeIn">
      {/* 404 Illustration Card */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden card p-6 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-2 border-primary/20">
        <Image
          src="/assets/images/404-icon.png"
          alt="404 Not Found"
          fill
          className="object-contain p-6 animate-float"
          priority
          sizes="224px"
        />
      </div>

      <div className="space-y-3 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Lạc Lối Rồi!
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          Trang bạn đang tìm kiếm có thể đã được đổi tên, chuyển vị trí hoặc không tồn tại trong Chill Zone.
        </p>
      </div>

      {/* Suggested navigation buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Về Trang Chủ</span>
        </Link>
        <Link
          href="/blog"
          className="px-5 py-3 rounded-2xl card hover:border-primary/40 text-text-primary font-semibold text-sm transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Đọc Bài Viết</span>
        </Link>
        <Link
          href="/music"
          className="px-5 py-3 rounded-2xl card hover:border-rose-500/40 text-text-primary font-semibold text-sm transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <Music className="w-4 h-4 text-rose-500" />
          <span>Nghe Nhạc</span>
        </Link>
      </div>
    </div>
  );
}
