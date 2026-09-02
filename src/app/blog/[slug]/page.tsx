import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BlogReaderHeader } from "@/components/BlogReaderHeader";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Story Not Found | Chill Zone",
    };
  }

  return {
    title: `${post.title} | Chill Zone`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Interactive Reading Progress & Actions */}
      <BlogReaderHeader />

      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Tất cả bài viết</span>
        </Link>
      </div>

      {/* Article Header Card */}
      <article className="glass-card rounded-3xl overflow-hidden p-6 md:p-10 border border-slate-200/80 dark:border-slate-800/80">
        {/* Post Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Cover Image Banner */}
        {post.image && (
          <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden mb-8 border border-slate-200 dark:border-slate-800 shadow-md">
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

        {/* Markdown Content */}
        <div
          className="prose-custom max-w-none pt-2"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Prev / Next Story Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="glass-card-interactive rounded-2xl p-4 flex flex-col justify-between group"
          >
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              ← Bài viết trước
            </span>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {prevPost.title}
            </p>
          </Link>
        ) : <div />}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="glass-card-interactive rounded-2xl p-4 flex flex-col justify-between text-right group sm:items-end"
          >
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 justify-end">
              Bài tiếp theo →
            </span>
            <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {nextPost.title}
            </p>
          </Link>
        ) : <div />}
      </div>

      <Footer />
    </div>
  );
}
