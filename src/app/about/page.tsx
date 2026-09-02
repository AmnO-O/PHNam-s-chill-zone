import Image from "next/image";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import {
  Sparkles,
  GraduationCap,
  Code2,
  Heart,
  ExternalLink,
  Share2,
  Globe,
  MessageCircle,
  MapPin,
  Calendar,
  Layers,
  Send
} from "lucide-react";

export const metadata = {
  title: "Giới thiệu | Phạm Hữu Nam",
  description: "Thông tin giới thiệu về Phạm Hữu Nam - Sinh viên HCMUS, đam mê công nghệ và cuộc sống.",
};

const techCategories = [
  {
    name: "Frontend & UI",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    name: "Backend & Hệ thống",
    items: ["Node.js", "C / C++", "Python", "REST APIs", "Git & GitHub"],
  },
  {
    name: "Công cụ & Môi trường",
    items: ["VS Code", "Vercel", "Figma", "Postman", "Linux"],
  },
];

const timelineEvents = [
  {
    period: "2023 - Hiện tại",
    title: "Sinh viên Đại học Khoa học Tự nhiên (HCMUS)",
    subtitle: "Đại học Quốc gia TP.HCM (VNU-HCM)",
    desc: "Theo học chuyên ngành công nghệ thông tin, nghiên cứu các môn thuật toán, cấu trúc dữ liệu và phát triển phần mềm.",
  },
  {
    period: "2024 - 2026",
    title: "Xây dựng dự án cá nhân & Chill Zone",
    subtitle: "Trang web cá nhân & Ứng dụng Web",
    desc: "Phát triển các trang web cá nhân, trải nghiệm các framework hiện đại như Next.js, Tailwind CSS và chia sẻ blog tản văn.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-7 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Hero Profile Card */}
      <ScrollAnimation animation="fadeIn">
        <div className="card rounded-2xl p-5 sm:p-7 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7">
            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-primary/20 shadow-lg shrink-0 group">
              <Image
                src="/assets/images/hcmus_avatar.jpg"
                alt="Phạm Hữu Nam"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
                sizes="144px"
              />
              <span
                className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-xs"
                title="Đang trực tuyến"
              />
            </div>

            {/* Profile Intro */}
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Người sáng lập Chill Zone</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Phạm Hữu Nam
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-text-secondary font-medium">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  HCMUS - ĐHQG TP.HCM
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  TP. Hồ Chí Minh
                </span>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                Chào bạn! Mình là Nam. Đây là <strong>Chill Zone</strong> — không gian cá nhân nơi mình lưu trữ những giai điệu yêu thích, chia sẻ những bài viết tản văn và ghi lại hành trình học tập, trải nghiệm của bản thân.
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Timeline Section */}
      <ScrollAnimation animation="fadeInUp" delay={100}>
        <div className="card rounded-2xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-primary">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-text-primary">
                Hành Trình & Dấu Mốc
              </h2>
              <p className="text-[11px] text-text-tertiary">
                Chặng đường học tập và phát triển bản thân
              </p>
            </div>
          </div>

          <div className="space-y-5 pl-4 sm:pl-5 border-l-2 border-primary/20 ml-2">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[21px] sm:-left-[25px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background ring-2 ring-primary/30" />
                <span className="text-[11px] font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                  {evt.period}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-text-primary mt-1.5">
                  {evt.title}
                </h3>
                <p className="text-xs font-semibold text-text-tertiary">
                  {evt.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      {/* Grid: Tech Stack & Lifestyle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tech Stack */}
        <ScrollAnimation animation="fadeInUp" delay={150}>
          <div className="card rounded-2xl p-5 sm:p-6 space-y-4 h-full">
            <div className="flex items-center gap-2.5 text-primary">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Code2 className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-base text-text-primary">
                Công Nghệ & Kỹ Năng
              </h2>
            </div>

            <div className="space-y-3.5">
              {techCategories.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3" /> {cat.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-secondary text-text-primary text-xs font-semibold border border-border transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Hobbies & Lifestyle */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="card rounded-2xl p-5 sm:p-6 space-y-4 h-full">
            <div className="flex items-center gap-2.5 text-rose-500">
              <div className="p-1.5 rounded-lg bg-rose-500/10">
                <Heart className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-base text-text-primary">
                Sở Thích & Cuộc Sống
              </h2>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              Ngoài giờ học tập và lập trình, mình tìm kiếm sự cân bằng qua những niềm vui giản dị:
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-secondary/50">
                <span className="text-base">🎧</span>
                <span>Nghe nhạc Lofi, Acoustic và Indie Việt những buổi tối muộn hoặc khi trời mưa.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-secondary/50">
                <span className="text-base">📖</span>
                <span>Đọc sách, suy ngẫm về các góc nhìn cuộc sống và ghi chép nhật ký blog.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-secondary/50">
                <span className="text-base">☕</span>
                <span>Khám phá những quán cafe yên tĩnh quanh Sài Gòn để làm việc và trò chuyện.</span>
              </li>
            </ul>
          </div>
        </ScrollAnimation>
      </div>

      {/* Connect Card */}
      <ScrollAnimation animation="fadeInUp" delay={250}>
        <div className="card rounded-2xl p-5 sm:p-8 text-center space-y-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-text-primary">
              Kết Nối Cùng Mình
            </h2>
            <p className="text-xs text-text-secondary">
              Rất vui được kết nối và trò chuyện cùng bạn qua mạng xã hội hoặc gửi tin nhắn ẩn danh:
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-1 flex-wrap">
            <a
              href="https://www.facebook.com/pham.huu.nam.AmnOO/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all duration-150 inline-flex items-center gap-1.5 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>

            <a
              href="https://github.com/AmnO-O"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-semibold transition-all duration-150 inline-flex items-center gap-1.5 shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://link-it.me/s/5d8034a4-c0bb-4e8c-84ed-2b6f29cbce12"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-all duration-150 inline-flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Tin nhắn ẩn danh</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}
