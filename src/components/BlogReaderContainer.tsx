"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, BlogPostMeta } from "@/types";
import { BlogReadingToolbar, FontSizeOption, FontFamilyOption } from "./BlogReadingToolbar";
import { BlogTableOfContents } from "./BlogTableOfContents";
import { BlogReactions } from "./BlogReactions";
import { BlogCommentSection } from "./BlogCommentSection";
import { Calendar, Clock, Tag, ArrowLeft, X } from "lucide-react";

interface BlogReaderContainerProps {
  post: BlogPost;
  prevPost: BlogPostMeta | null;
  nextPost: BlogPostMeta | null;
}

export function BlogReaderContainer({
  post,
  prevPost,
  nextPost,
}: BlogReaderContainerProps) {
  const [fontSize, setFontSize] = useState<FontSizeOption>("base");
  const [fontFamily, setFontFamily] = useState<FontFamilyOption>("sans");
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedSize = localStorage.getItem("chill_reader_font_size") as FontSizeOption;
      const savedFamily = localStorage.getItem("chill_reader_font_family") as FontFamilyOption;
      if (savedSize && ["sm", "base", "lg", "xl"].includes(savedSize)) {
        setFontSize(savedSize);
      }
      if (savedFamily && ["sans", "serif"].includes(savedFamily)) {
        setFontFamily(savedFamily);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to localStorage
  const handleSetFontSize = (size: FontSizeOption) => {
    setFontSize(size);
    try {
      localStorage.setItem("chill_reader_font_size", size);
    } catch {
      // ignore
    }
  };

  const handleSetFontFamily = (family: FontFamilyOption) => {
    setFontFamily(family);
    try {
      localStorage.setItem("chill_reader_font_family", family);
    } catch {
      // ignore
    }
  };

  // Keyboard shortcut: Esc to exit Zen Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZenMode) {
        setIsZenMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZenMode]);

  const toggleZenMode = () => {
    setIsZenMode((prev) => !prev);
  };

  const scrollToComments = () => {
    const el = document.getElementById("comments-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check if content has headings for TOC
  const hasHeadings =
    post.contentHtml.includes("<h2") || post.contentHtml.includes("<h3");

  // Dynamic font size classes for the prose
  const fontSizeClasses: Record<FontSizeOption, string> = {
    sm: "text-reading-sm",
    base: "text-reading-base",
    lg: "text-reading-lg",
    xl: "text-reading-xl",
  };

  // Dynamic font family classes
  const fontFamilyClass =
    fontFamily === "serif"
      ? "font-serif tracking-normal"
      : "font-sans";

  return (
    <div
      className={`transition-all duration-300 ${
        isZenMode
          ? "fixed inset-0 z-50 overflow-y-auto bg-background p-4 sm:p-8 md:p-12"
          : "space-y-6"
      }`}
    >
      {/* Top Zen Mode Exit Bar (Only visible in Zen Mode) */}
      {isZenMode && (
        <div className="max-w-3xl mx-auto flex items-center justify-between py-2 mb-6 border-b border-border">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Chế độ đọc tập trung (Nhấn Esc để thoát)</span>
          </div>
          <button
            onClick={() => setIsZenMode(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-secondary text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Thoát Focus</span>
          </button>
        </div>
      )}

      {/* Standard Header Navigation (hidden in Zen Mode) */}
      {!isZenMode && (
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl card text-xs font-semibold text-text-secondary hover:text-primary hover:border-primary/40 transition-all shadow-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Tất cả bài viết</span>
          </Link>
        </div>
      )}

      {/* Reading Controls Toolbar */}
      <div className={isZenMode ? "max-w-3xl mx-auto mb-6" : ""}>
        <BlogReadingToolbar
          fontSize={fontSize}
          setFontSize={handleSetFontSize}
          fontFamily={fontFamily}
          setFontFamily={handleSetFontFamily}
          isZenMode={isZenMode}
          toggleZenMode={toggleZenMode}
          isTocOpen={isTocOpen}
          toggleToc={() => setIsTocOpen(!isTocOpen)}
          hasHeadings={hasHeadings}
        />
      </div>

      {/* Table of Contents Box */}
      <div className={isZenMode ? "max-w-3xl mx-auto" : ""}>
        <BlogTableOfContents
          contentHtml={post.contentHtml}
          isOpen={isTocOpen}
          onClose={() => setIsTocOpen(false)}
        />
      </div>

      {/* Article Card */}
      <article
        className={`card rounded-3xl overflow-hidden p-5 sm:p-8 md:p-10 ${
          isZenMode
            ? "max-w-3xl mx-auto shadow-xl border-border bg-surface"
            : ""
        }`}
      >
        {/* Author Header & Publication Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20">
              <Image
                src="/assets/images/hcmus_avatar.jpg"
                alt="Phạm Hữu Nam"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-text-primary">
                Phạm Hữu Nam
              </p>
              <p className="text-[11px] text-text-tertiary">HCMUS Student</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-text-tertiary">
            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Cover Image */}
        {post.image && (
          <div className="relative h-56 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden mb-8 border border-border shadow-xs">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        {/* Markdown Content Area with Custom Font Size and Family */}
        <div
          className={`prose-custom max-w-none ${fontFamilyClass} ${fontSizeClasses[fontSize]}`}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-5 border-t border-border flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-xs text-text-tertiary font-medium">Chủ đề:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-secondary text-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Reactions Section */}
      <div className={isZenMode ? "max-w-3xl mx-auto" : ""}>
        <BlogReactions
          slug={post.slug}
          onScrollToComments={scrollToComments}
          commentCount={commentCount}
        />
      </div>

      {/* Prev / Next Article Navigation (Only outside Zen Mode) */}
      {!isZenMode && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="card-interactive rounded-2xl p-4 flex flex-col justify-between group"
            >
              <span className="text-[11px] font-semibold text-text-tertiary flex items-center gap-1">
                ← Bài trước
              </span>
              <p className="font-bold text-xs sm:text-sm text-text-primary mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                {prevPost.title}
              </p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="card-interactive rounded-2xl p-4 flex flex-col justify-between text-right group sm:items-end"
            >
              <span className="text-[11px] font-semibold text-text-tertiary flex items-center gap-1 justify-end">
                Bài tiếp theo →
              </span>
              <p className="font-bold text-xs sm:text-sm text-text-primary mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                {nextPost.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Comments Section */}
      <div className={isZenMode ? "max-w-3xl mx-auto" : ""}>
        <BlogCommentSection
          slug={post.slug}
          onCommentCountChange={setCommentCount}
        />
      </div>
    </div>
  );
}
