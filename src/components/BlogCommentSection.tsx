"use client";

import { useState, useEffect, useId } from "react";
import { getPostComments, createPostComment, Comment, isSupabaseConfigured } from "@/lib/supabase";
import { MessageSquare, Send, Clock, CheckCircle2 } from "lucide-react";

interface BlogCommentSectionProps {
  slug: string;
  onCommentCountChange?: (count: number) => void;
}

export function BlogCommentSection({
  slug,
  onCommentCountChange,
}: BlogCommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const nameInputId = useId();
  const contentInputId = useId();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await getPostComments(slug);
      setComments(data);
      if (onCommentCountChange) {
        onCommentCountChange(data.length);
      }
      setIsLoading(false);
    }
    load();
  }, [slug, onCommentCountChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const res = await createPostComment(
      slug,
      authorName || "Ẩn danh",
      content
    );

    if (res.success && res.comment) {
      const updated = [res.comment, ...comments];
      setComments(updated);
      if (onCommentCountChange) {
        onCommentCountChange(updated.length);
      }
      setContent("");
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 3000);
    }

    setIsSubmitting(false);
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Vừa xong";
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "AN";
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <section id="comments-section" className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-base text-text-primary">
            Bình luận ({comments.length})
          </h3>
        </div>

        {hasSupabase ? (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            ● Supabase Cloud
          </span>
        ) : (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            ● Chế độ lưu trữ
          </span>
        )}
      </div>

      {/* Clean Form without cartoon emojis */}
      <form onSubmit={handleSubmit} className="card rounded-2xl p-4 sm:p-5 space-y-3">
        <div>
          <label htmlFor={nameInputId} className="block text-xs font-semibold text-text-secondary mb-1">
            Tên hoặc biệt danh của bạn:
          </label>
          <input
            id={nameInputId}
            type="text"
            placeholder="Tên của bạn (tuỳ chọn)..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={40}
            className="w-full px-3 py-1.5 rounded-xl bg-secondary border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-tertiary"
          />
        </div>

        <div>
          <label htmlFor={contentInputId} className="block text-xs font-semibold text-text-secondary mb-1">
            Nội dung:
          </label>
          <textarea
            id={contentInputId}
            placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            required
            className="w-full px-3 py-2 rounded-xl bg-secondary border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-tertiary resize-y"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-text-tertiary">
            Mọi người đều có thể đọc bình luận của bạn.
          </span>

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Đang gửi...</span>
            ) : submittedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Đã gửi</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Clean Comments List with initial badges */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-6 text-xs text-text-tertiary animate-pulse">
            Đang tải bình luận...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-xs text-text-tertiary">
            Chưa có bình luận nào. Hãy để lại cảm nghĩ đầu tiên nhé!
          </div>
        ) : (
          comments.map((cmt) => (
            <div
              key={cmt.id}
              className="card rounded-xl p-3.5 sm:p-4 space-y-2 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    {getInitials(cmt.author_name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-text-primary">
                      {cmt.author_name}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{formatTime(cmt.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pl-9">
                {cmt.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
