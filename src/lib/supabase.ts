export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  avatar_id?: number;
  created_at: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("your-project")
  );
};

// Fetch comments for a post
export async function getPostComments(slug: string): Promise<Comment[]> {
  // If Supabase is configured in env, fetch from Supabase REST API
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/comments?post_slug=eq.${encodeURIComponent(
          slug
        )}&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const data = await res.json();
        return data as Comment[];
      }
    } catch (err) {
      console.warn("Supabase fetch error, using local fallback:", err);
    }
  }

  // Fallback to localStorage on client side
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`chill_comments_${slug}`);
      if (stored) {
        return JSON.parse(stored) as Comment[];
      }
    } catch {
      // ignore
    }
  }

  return [];
}

// Post a new comment
export async function createPostComment(
  slug: string,
  authorName: string,
  content: string,
  avatarId: number = 1
): Promise<{ success: boolean; comment?: Comment; error?: string }> {
  const newComment: Comment = {
    id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    post_slug: slug,
    author_name: authorName.trim() || "Người bạn ẩn danh",
    content: content.trim(),
    avatar_id: avatarId,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        const data = await res.json();
        const created = Array.isArray(data) ? data[0] : newComment;
        return { success: true, comment: created };
      }
    } catch (err) {
      console.warn("Supabase insert error, falling back to local:", err);
    }
  }

  // Save to client localStorage as reliable fallback
  if (typeof window !== "undefined") {
    try {
      const key = `chill_comments_${slug}`;
      const existing = localStorage.getItem(key);
      const list: Comment[] = existing ? JSON.parse(existing) : [];
      list.unshift(newComment);
      localStorage.setItem(key, JSON.stringify(list));
      return { success: true, comment: newComment };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  }

  return { success: true, comment: newComment };
}
