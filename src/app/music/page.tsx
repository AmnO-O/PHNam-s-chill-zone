import { MusicLounge } from "@/components/MusicLounge";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Music, Sparkles } from "lucide-react";
import { musicCollection } from "@/data/music";

export const metadata = {
  title: "Góc Âm Nhạc | Chill Zone",
  description: "Tuyển tập những bản nhạc lofi, acoustic và chill indie tuyển chọn.",
};

export default function MusicPage() {
  return (
    <div className="space-y-6 sm:space-y-7 animate-fadeIn">
      {/* Header Banner */}
      <ScrollAnimation animation="fadeIn">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-700 text-white p-5 sm:p-7">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
              <Music className="w-3.5 h-3.5 text-rose-200" />
              <span>Giai điệu thư giãn</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Góc Âm Nhạc
            </h1>
            <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed">
              Tuyển tập giai điệu Lofi và Indie Việt được chọn lọc kĩ lưỡng cho những buổi học tập, làm việc hoặc thư giãn đêm muộn.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{musicCollection.length}+ bài hát có sẵn</span>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" delay={100}>
        <MusicLounge />
      </ScrollAnimation>
    </div>
  );
}
