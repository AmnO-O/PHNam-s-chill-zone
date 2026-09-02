"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/types";
import { Search, Calendar, Clock, ArrowRight, Tag, X, BookOpen } from "lucide-react";

interface BlogListProps {
  posts: BlogPostMeta[];
}

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []).filter(Boolean))
  );

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "all" || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const featuredPost = searchQuery === "" && selectedTag === "all" && filteredPosts.length > 0
    ? filteredPosts[0]
    : null;

  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="space-y-6">
      {/* Search & Tag Filter Bar */}
      <div className="card rounded-2xl p-4 sm:p-5 space-y-3.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết, suy ngẫm, chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-secondary border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-tertiary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-text-primary"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-text-tertiary flex items-center gap-1 shrink-0 font-medium text-[11px]">
              <Tag className="w-3 h-3" /> Chủ đề:
            </span>
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedTag === "all"
                  ? "bg-primary text-white shadow-xs"
                  : "bg-secondary text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              Tất cả ({posts.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  selectedTag === tag
                    ? "bg-primary text-white shadow-xs"
                    : "bg-secondary text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured Post Card */}
      {featuredPost && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bài viết mới nhất</span>
          </div>
          <article className="card-interactive rounded-2xl overflow-hidden group">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-0"
            >
              <div className="relative h-48 md:h-full md:min-h-[240px] md:col-span-5 bg-secondary overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {featuredPost.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[11px] font-medium text-text-tertiary mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {featuredPost.readingTime}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-text-secondary mt-2 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">
                    Nhấn để đọc toàn bộ bài viết
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 card rounded-2xl">
          <p className="text-sm text-text-secondary font-medium">
            Không tìm thấy bài viết nào phù hợp với &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("all");
            }}
            className="mt-3 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
          >
            Xem tất cả bài viết
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {gridPosts.map((post) => (
            <article
              key={post.slug}
              className="card-interactive rounded-2xl overflow-hidden flex flex-col group"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                {/* Post Cover */}
                <div className="relative h-40 w-full bg-secondary overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {post.tags && post.tags.length > 0 && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md">
                      #{post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Content */}
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

                  {/* Footer metadata & link */}
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      {post.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-secondary text-text-secondary"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Đọc tiếp <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
