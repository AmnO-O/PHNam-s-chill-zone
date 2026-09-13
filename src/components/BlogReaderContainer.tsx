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

  const fontSizeClasses: Record<FontSizeOption, string> = {
    sm: "text-reading-sm",
    base: "text-reading-base",
    lg: "text-reading-lg",
    xl: "text-reading-xl",
  };

  const fontFamilyClass =
    fontFamily === "serif"
      ? "font-serif tracking-normal"
      : "font-sans";

  return (
    <>
      {/* Zen / Focus Mode: Clean, distraction-free reading canvas */}
      {isZenMode ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background animate-fadeIn">
          {/* Top subtle bar to exit */}
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border/80 px-4 py-2.5">
            <div className="max-w-2xl mx-auto flex items-center justify-between text-xs">
              <span className="text-text-tertiary">Chế độ đọc tập trung (nhấn Esc để thoát)</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSetFontFamily(fontFamily === "sans" ? "serif" : "sans")}
                  className="px-2 py-1 rounded bg-secondary text-text-secondary hover:text-text-primary"
                >
                  {fontFamily === "sans" ? "Đổi sang Serif" : "Đổi sang Sans"}
                </button>
                <button
                  onClick={() => setIsZenMode(false)}
                  className="px-2.5 py-1 rounded bg-rose-500 text-white font-semibold flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Thoát</span>
                </button>
              </div>
            </div>
          </div>

          <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
            <div className="space-y-3 pb-6 border-b border-border">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-text-tertiary">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>

            <div
              className={`prose-custom max-w-none ${fontFamilyClass} ${fontSizeClasses[fontSize]}`}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </main>
        </div>
      ) : (
        /* Normal 2-Column Responsive Layout */
        <div className="space-y-6">
          {/* Back link */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl card text-xs font-semibold text-text-secondary hover:text-primary hover:border-primary/40 transition-all shadow-xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Tất cả bài viết</span>
            </Link>
          </div>

          {/* 2-Column Desktop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Article (Left / Center) */}
            <article className="lg:col-span-8 card rounded-2xl p-5 sm:p-7 md:p-8 space-y-6">
              {/* Clean Byline */}
              <div className="flex items-center justify-between text-xs text-text-tertiary border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">Phạm Hữu Nam</span>
                  <span>•</span>
                  <span>HCMUS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Cover Image */}
              {post.image && (
                <div className="relative h-52 sm:h-72 w-full rounded-xl overflow-hidden border border-border">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 896px) 100vw, 720px"
                  />
                </div>
              )}

              {/* Content with dynamic font size and family */}
              <div
                className={`prose-custom max-w-none ${fontFamilyClass} ${fontSizeClasses[fontSize]}`}
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-4 border-t border-border flex items-center gap-2 flex-wrap text-xs">
                  <Tag className="w-3.5 h-3.5 text-text-tertiary" />
                  <span className="text-text-tertiary">Chủ đề:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-secondary text-text-secondary text-[11px] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Reactions */}
              <div className="pt-4 border-t border-border">
                <BlogReactions
                  slug={post.slug}
                  onScrollToComments={scrollToComments}
                  commentCount={commentCount}
                />
              </div>

              {/* Prev / Next */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="card-interactive rounded-xl p-3.5 flex flex-col justify-between group text-xs"
                  >
                    <span className="text-[11px] text-text-tertiary">← Bài trước</span>
                    <p className="font-semibold text-text-primary mt-1 truncate group-hover:text-primary transition-colors">
                      {prevPost.title}
                    </p>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="card-interactive rounded-xl p-3.5 flex flex-col justify-between text-right group text-xs sm:items-end"
                  >
                    <span className="text-[11px] text-text-tertiary">Bài tiếp theo →</span>
                    <p className="font-semibold text-text-primary mt-1 truncate group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </p>
                  </Link>
                ) : <div />}
              </div>

              {/* Comments Section */}
              <BlogCommentSection
                slug={post.slug}
                onCommentCountChange={setCommentCount}
              />
            </article>

            {/* Right Hand Side Sticky Sidebar (TOC + Reading Controls) */}
            <aside className="lg:col-span-4 sticky top-20 space-y-5 hidden lg:block">
              <div className="card rounded-2xl p-4 space-y-4">
                <BlogReadingToolbar
                  fontSize={fontSize}
                  setFontSize={handleSetFontSize}
                  fontFamily={fontFamily}
                  setFontFamily={handleSetFontFamily}
                  isZenMode={isZenMode}
                  toggleZenMode={toggleZenMode}
                />
              </div>

              <div className="card rounded-2xl p-4">
                <BlogTableOfContents contentHtml={post.contentHtml} />
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
