import { getAllPosts } from "@/lib/posts";
import { BlogList } from "@/components/BlogList";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Bài viết & Tản văn | Chill Zone",
  description: "Tất cả các bài viết, suy ngẫm và câu chuyện của Phạm Hữu Nam",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6 sm:space-y-7 animate-fadeIn">
      {/* Header Banner */}
      <ScrollAnimation animation="fadeIn">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-5 sm:p-7">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Tản văn & Kỷ niệm</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Góc Kỷ Niệm & Tâm Sự
            </h1>
            <p className="text-indigo-100/90 text-xs sm:text-sm leading-relaxed">
              Nơi ghi lại những khoảnh khắc đời thường, bài học tuổi trẻ, trải nghiệm sống và hành trình học tập tại HCMUS.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tổng cộng {posts.length} bài viết</span>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Interactive Blog List */}
      <ScrollAnimation animation="fadeInUp" delay={100}>
        <BlogList posts={posts} />
      </ScrollAnimation>
    </div>
  );
}
