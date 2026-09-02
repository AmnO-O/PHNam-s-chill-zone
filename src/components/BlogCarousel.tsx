"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/types";
import { ChevronLeft, ChevronRight, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

interface BlogCarouselProps {
  posts: BlogPostMeta[];
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollContainerRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        ref.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [posts]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="card text-center py-10 text-text-tertiary text-xs sm:text-sm">
        Chưa có bài viết nào. Hãy đón chờ những câu chuyện mới!
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header with Navigation Controls */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tản văn & Kỷ niệm</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">
            Những Câu Chuyện & Suy Ngẫm
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Những mẩu chuyện, dòng suy nghĩ và góc nhìn cuộc sống
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/blog"
            className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 mr-2 group"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-1.5 rounded-lg border border-border bg-surface text-text-secondary transition-all ${
              canScrollLeft
                ? "hover:bg-surface-hover hover:text-text-primary shadow-xs active:scale-95"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Bài viết trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-1.5 rounded-lg border border-border bg-surface text-text-secondary transition-all ${
              canScrollRight
                ? "hover:bg-surface-hover hover:text-text-primary shadow-xs active:scale-95"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Bài viết tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory no-scrollbar -mx-1 px-1"
      >
        {posts.map((post) => (
          <article
            key={post.slug}
            className="w-[260px] sm:w-[280px] shrink-0 snap-start card-interactive rounded-2xl overflow-hidden flex flex-col group"
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
              {/* Post Cover Image */}
              <div className="relative h-36 w-full bg-secondary overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 260px, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {post.tags && post.tags.length > 0 && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md">
                    #{post.tags[0]}
                  </span>
                )}
              </div>

              {/* Post Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2.5 text-[11px] font-medium text-text-tertiary mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-text-primary text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
