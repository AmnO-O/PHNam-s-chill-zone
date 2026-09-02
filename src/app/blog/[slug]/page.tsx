import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { BlogReaderHeader } from "@/components/BlogReaderHeader";
import { BlogReaderContainer } from "@/components/BlogReaderContainer";
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
      title: "Bài viết không tìm thấy | Chill Zone",
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
    <div className="animate-fadeIn max-w-4xl mx-auto">
      {/* Interactive Top Reading Progress Bar & Floating Actions */}
      <BlogReaderHeader />

      {/* Main Blog Reader Container with Toolbar, TOC, Prose, Reactions & Comments */}
      <BlogReaderContainer
        post={post}
        prevPost={prevPost}
        nextPost={nextPost}
      />
    </div>
  );
}
