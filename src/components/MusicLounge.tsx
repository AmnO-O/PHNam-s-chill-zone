"use client";

import { useState } from "react";
import { musicCollection, MusicTrack } from "@/data/music";
import { Music, Play, ExternalLink, Shuffle, Search, X, Volume2, Sparkles, Disc } from "lucide-react";
import Image from "next/image";

export function MusicLounge() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalTrack, setActiveModalTrack] = useState<MusicTrack | null>(null);

  const filteredTracks = musicCollection.filter((track) => {
    const matchesCategory =
      selectedCategory === "all" || track.category === selectedCategory;
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(track.id).includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleRandomPlay = () => {
    const randomTrack =
      musicCollection[Math.floor(Math.random() * musicCollection.length)];
    setActiveModalTrack(randomTrack);
  };

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="card rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Tìm theo tên bài hát hoặc số thứ tự..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-text-primary placeholder:text-text-tertiary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories & Random Action */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar justify-between md:justify-end">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-rose-500 text-white shadow-xs"
                  : "bg-secondary text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              Tất cả ({musicCollection.length})
            </button>
            <button
              onClick={() => setSelectedCategory("lofi")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === "lofi"
                  ? "bg-rose-500 text-white shadow-xs"
                  : "bg-secondary text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              Lofi Beats
            </button>
            <button
              onClick={() => setSelectedCategory("viet-chill")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === "viet-chill"
                  ? "bg-rose-500 text-white shadow-xs"
                  : "bg-secondary text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              Viet Chill & Indie
            </button>
          </div>

          <button
            onClick={handleRandomPlay}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random</span>
          </button>
        </div>
      </div>

      {/* Music Track Grid */}
      {filteredTracks.length === 0 ? (
        <div className="card text-center py-16 rounded-3xl">
          <p className="text-base text-text-secondary font-medium">
            Không tìm thấy bài hát nào phù hợp với &ldquo;{searchQuery}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTracks.map((track) => {
            const thumb = track.youtubeId
              ? `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`
              : "/assets/images/Blog-images/blog0-all.jpg";

            return (
              <div
                key={track.id}
                className="card-interactive rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Cover */}
                  <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={thumb}
                      alt={track.title}
                      fill
                      className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setActiveModalTrack(track)}
                        className="p-3 rounded-full bg-rose-500 text-white shadow-lg transform hover:scale-110 active:scale-95 transition-all"
                        aria-label="Play track"
                      >
                        <Play className="w-5 h-5 fill-white" />
                      </button>
                    </div>
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-sm">
                      #{track.id}
                    </span>
                  </div>

                  {/* Track Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-text-primary truncate group-hover:text-rose-500 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1.5">
                      <Disc className="w-3 h-3 text-rose-400" />
                      {track.category === "lofi" ? "Lofi Beat" : "Viet Chill / Indie"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalTrack(track)}
                    className="flex-1 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current" /> Play
                  </button>
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-text-tertiary hover:text-text-primary hover:bg-secondary transition-all"
                    title="Mở trên YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Player */}
      {activeModalTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-scaleIn">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950 text-white">
              <div className="flex items-center gap-2.5">
                <Music className="w-4 h-4 text-rose-500" />
                <span className="font-semibold text-sm truncate">
                  Now Playing: {activeModalTrack.title}
                </span>
              </div>
              <button
                onClick={() => setActiveModalTrack(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Đóng trình phát"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              {activeModalTrack.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeModalTrack.youtubeId}?autoplay=1`}
                  title={activeModalTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  Không thể phát video này.
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-rose-500" />
                Thưởng thức không gian chill!
              </span>
              <button
                onClick={handleRandomPlay}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-semibold text-xs sm:text-sm"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Bài tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
