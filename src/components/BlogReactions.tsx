"use client";

import { useState, useEffect } from "react";
import { Heart, Sparkles, MessageSquare } from "lucide-react";

interface BlogReactionsProps {
  slug: string;
  onScrollToComments?: () => void;
  commentCount?: number;
}

export function BlogReactions({
  slug,
  onScrollToComments,
  commentCount = 0,
}: BlogReactionsProps) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(`chill_likes_${slug}`);
      const userLiked = localStorage.getItem(`chill_user_liked_${slug}`);
      if (storedLikes) {
        setLikes(parseInt(storedLikes, 10));
      } else {
        // Default pleasant initial count
        setLikes(Math.floor(Math.random() * 8) + 5);
      }
      if (userLiked) {
        setHasLiked(true);
      }
    } catch {
      // ignore
    }
  }, [slug]);

  const handleLike = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    const newCount = likes + 1;
    setLikes(newCount);
    setHasLiked(true);

    try {
      localStorage.setItem(`chill_likes_${slug}`, String(newCount));
      localStorage.setItem(`chill_user_liked_${slug}`, "true");
    } catch {
      // ignore
    }
  };

  return (
    <div className="card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-border bg-surface/80">
      <div className="text-center sm:text-left space-y-0.5">
        <h4 className="font-bold text-sm text-text-primary flex items-center justify-center sm:justify-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Bài viết có chạm đến bạn?</span>
        </h4>
        <p className="text-xs text-text-tertiary">
          Gửi một chút năng lượng và lời động viên đến Nam nhé!
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 shadow-xs ${
            hasLiked
              ? "bg-rose-500 text-white hover:bg-rose-600"
              : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white"
          }`}
          title="Thả tim bài viết"
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              hasLiked ? "fill-white" : ""
            } ${isAnimating ? "scale-125 animate-ping" : ""}`}
          />
          <span>Thả tim ({likes})</span>
        </button>

        {/* Jump to Comments button */}
        {onScrollToComments && (
          <button
            onClick={onScrollToComments}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-secondary text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all"
            title="Đến phần bình luận"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>Bình luận ({commentCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}
