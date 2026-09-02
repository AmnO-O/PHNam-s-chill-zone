"use client";

import { useState, useEffect, useId } from "react";
import { getPostComments, createPostComment, Comment, isSupabaseConfigured } from "@/lib/supabase";
import { MessageSquare, Send, User, Sparkles, Clock, CheckCircle2 } from "lucide-react";

interface BlogCommentSectionProps {
  slug: string;
  onCommentCountChange?: (count: number) => void;
}

const AVATAR_OPTIONS = [
  { id: 1, emoji: "☕", label: "Cà phê" },
  { id: 2, emoji: "🌿", label: "Cỏ cây" },
  { id: 3, emoji: "🎧", label: "Tai nghe" },
  { id: 4, emoji: "✨", label: "Lấp lánh" },
  { id: 5, emoji: "🐱", label: "Mèo con" },
];

export function BlogCommentSection({
  slug,
  onCommentCountChange,
}: BlogCommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const nameInputId = useId();
  const contentInputId = useId();

  // Load comments
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
      authorName || "Người bạn ghé thăm",
      content,
      selectedAvatar
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
      return "Gần đây";
    }
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <section id="comments-section" className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-text-primary">
              Góc Bình Luận & Chia Sẻ
            </h3>
            <p className="text-xs text-text-tertiary">
              Cảm nghĩ và lời nhắn nhủ của độc giả ({comments.length})
            </p>
          </div>
        </div>

        {hasSupabase ? (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            ● Supabase Cloud
          </span>
        ) : (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            ● Chế độ ẩn danh
          </span>
        )}
      </div>

      {/* Comment Form Card */}
      <form onSubmit={handleSubmit} className="card rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Author Name Input */}
          <div className="flex-1">
            <label htmlFor={nameInputId} className="block text-xs font-semibold text-text-secondary mb-1">
              Tên hoặc biệt danh của bạn:
            </label>
            <input
              id={nameInputId}
              type="text"
              placeholder="VD: Người bạn thích trà, Hải Đăng..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={40}
              className="w-full px-3.5 py-2 rounded-xl bg-secondary border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-tertiary"
            />
          </div>

          {/* Avatar Emoji Selector */}
          <div>
            <span id={`${nameInputId}-avatar-label`} className="block text-xs font-semibold text-text-secondary mb-1">
              Biểu tượng đại diện:
            </span>
            <div role="radiogroup" aria-labelledby={`${nameInputId}-avatar-label`} className="flex items-center gap-1.5 bg-secondary p-1 rounded-xl">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedAvatar(av.id)}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                    selectedAvatar === av.id
                      ? "bg-surface shadow-xs scale-110 ring-2 ring-primary"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  title={av.label}
                  aria-label={`Chọn biểu tượng ${av.label}`}
                  role="radio"
                  aria-checked={selectedAvatar === av.id}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor={contentInputId} className="block text-xs font-semibold text-text-secondary mb-1">
            Chia sẻ cảm nghĩ của bạn về bài viết:
          </label>
          <textarea
            id={contentInputId}
            placeholder="Bạn có đồng cảm với góc nhìn này không? Hãy để lại vài dòng tâm sự nhé..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder:text-text-tertiary resize-y"
          />
        </div>

        {/* Submit action */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-text-tertiary">
            Mọi người đều có thể đọc được bình luận của bạn.
          </p>

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Đang gửi...</span>
            ) : submittedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Đã gửi!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Gửi bình luận</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-xs text-text-tertiary animate-pulse">
            Đang tải bình luận...
          </div>
        ) : comments.length === 0 ? (
          <div className="card text-center py-10 rounded-2xl">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-2 opacity-60" />
            <p className="text-sm text-text-secondary font-medium">
              Chưa có bình luận nào cho bài viết này.
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Hãy là người đầu tiên chia sẻ góc nhìn hoặc lời nhắn nhủ cùng Nam nhé!
            </p>
          </div>
        ) : (
          comments.map((cmt) => {
            const avatarEmoji =
              AVATAR_OPTIONS.find((a) => a.id === cmt.avatar_id)?.emoji || "☕";

            return (
              <div
                key={cmt.id}
                className="card rounded-2xl p-4 sm:p-5 space-y-2.5 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-base shadow-2xs">
                      {avatarEmoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-text-primary">
                        {cmt.author_name}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{formatTime(cmt.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pl-1">
                  {cmt.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
