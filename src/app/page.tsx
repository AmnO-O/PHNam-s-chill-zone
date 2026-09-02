import { getAllPosts } from "@/lib/posts";
import { HomeHero } from "@/components/HomeHero";
import { MusicWidget } from "@/components/MusicWidget";
import { QuoteWidget } from "@/components/QuoteWidget";
import { BlogCarousel } from "@/components/BlogCarousel";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { ArrowRight, ExternalLink, Coffee, Heart, Send, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-7 sm:space-y-8">
      {/* Hero Section */}
      <ScrollAnimation animation="fadeIn">
        <HomeHero />
      </ScrollAnimation>

      {/* Bento Grid: Music Lounge & Daily Quotes */}
      <ScrollAnimation animation="fadeInUp" delay={100}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          <div className="h-full">
            <MusicWidget />
          </div>
          <div className="h-full">
            <QuoteWidget />
          </div>
        </section>
      </ScrollAnimation>

      {/* Stories / Blog Posts Section Carousel */}
      <ScrollAnimation animation="fadeInUp" delay={150}>
        <section>
          <BlogCarousel posts={posts} />
        </section>
      </ScrollAnimation>

      {/* Feature Exploration Cards */}
      <ScrollAnimation animation="fadeInUp" delay={200}>
        <section>
          <div className="flex items-center gap-2 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              Khám Phá Thêm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/about"
              className="card-interactive rounded-2xl p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-text-tertiary group-hover:text-primary group-hover:bg-primary/10 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors">
                  Về Phạm Hữu Nam
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Khám phá hành trình học tập tại HCMUS, sở thích lập trình và phong cách sống.
                </p>
              </div>
            </Link>

            <Link
              href="/music"
              className="card-interactive rounded-2xl p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-text-tertiary group-hover:text-rose-500 group-hover:bg-rose-500/10 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-text-primary text-sm group-hover:text-rose-500 transition-colors">
                  Bộ Sưu Tập Âm Nhạc
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Hơn 30+ bản nhạc chill, lofi và acoustic được tuyển chọn kỹ lưỡng.
                </p>
              </div>
            </Link>

            <a
              href="https://link-it.me/s/5d8034a4-c0bb-4e8c-84ed-2b6f29cbce12"
              target="_blank"
              rel="noreferrer"
              className="card-interactive rounded-2xl p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-text-tertiary group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all">
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-text-primary text-sm group-hover:text-amber-500 transition-colors">
                  Gửi Tin Nhắn Ẩn Danh
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Có điều gì muốn tâm sự hay nhắn nhủ cùng Nam? Hãy để lại lời nhắn nhé!
                </p>
              </div>
            </a>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
