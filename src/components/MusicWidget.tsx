"use client";

import { useState } from "react";
import { musicCollection, MusicTrack } from "@/data/music";
import { Music, Shuffle, Play, ExternalLink, X, Volume2 } from "lucide-react";
import Image from "next/image";

export function MusicWidget() {
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack>(() =>
    musicCollection[Math.floor(Math.random() * musicCollection.length)]
  );
  const [isPlayingModalOpen, setIsPlayingModalOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleRandomPick = () => {
    setIsShuffling(true);
    setTimeout(() => {
      let nextTrack;
      do {
        nextTrack = musicCollection[Math.floor(Math.random() * musicCollection.length)];
      } while (nextTrack.id === selectedTrack.id && musicCollection.length > 1);
      setSelectedTrack(nextTrack);
      setIsShuffling(false);
    }, 200);
  };

  const handleOpenDirect = () => {
    window.open(selectedTrack.url, "_blank");
  };

  const thumbnailUrl = selectedTrack.youtubeId
    ? `https://img.youtube.com/vi/${selectedTrack.youtubeId}/hqdefault.jpg`
    : "/assets/images/Blog-images/blog0-all.jpg";

  return (
    <>
      <div className="card rounded-2xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between h-full group">
        {/* Background ambient */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/8 dark:bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-500">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm sm:text-base">
                  Âm Nhạc Tuyển Chọn
                </h3>
                <span className="text-[11px] text-text-tertiary font-medium">
                  Giai điệu thư giãn
                </span>
              </div>
            </div>

            {/* Animated equalizer */}
            <div className="flex items-end gap-[2px] h-4 px-1.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/30">
              <span className="w-[2px] bg-rose-500 rounded-full animate-eq1" />
              <span className="w-[2px] bg-rose-500 rounded-full animate-eq2" />
              <span className="w-[2px] bg-rose-500 rounded-full animate-eq3" />
            </div>
          </div>

          {/* Current Track Banner */}
          <div className="relative rounded-xl overflow-hidden border border-border bg-slate-900 my-1 group/cover">
            <div className="relative h-32 sm:h-34 w-full">
              <Image
                src={thumbnailUrl}
                alt={selectedTrack.title}
                fill
                className={`object-cover opacity-90 group-hover/cover:scale-105 transition-all duration-300 ${
                  isShuffling ? "blur-sm scale-105" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
              <div className="truncate pr-2">
                <p className="font-bold text-xs sm:text-sm truncate">{selectedTrack.title}</p>
                <p className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <Volume2 className="w-2.5 h-2.5 text-rose-400" />
                  Tuyển tập YouTube
                </p>
              </div>
              <button
                onClick={() => setIsPlayingModalOpen(true)}
                className="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transform hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                title="Phát bài này"
                aria-label="Phát video YouTube"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-3 mt-auto border-t border-border grid grid-cols-2 gap-2">
          <button
            onClick={handleRandomPick}
            disabled={isShuffling}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-surface-hover text-text-primary transition-all active:scale-95"
          >
            <Shuffle className={`w-3 h-3 ${isShuffling ? "animate-spin" : ""}`} />
            <span>Ngẫu nhiên</span>
          </button>

          <button
            onClick={handleOpenDirect}
            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all active:scale-95"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Mở YouTube</span>
          </button>
        </div>
      </div>

      {/* Embedded YouTube Player Modal */}
      {isPlayingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-scaleIn">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950 text-white">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold text-xs sm:text-sm truncate">
                  Đang phát: {selectedTrack.title}
                </span>
              </div>
              <button
                onClick={() => setIsPlayingModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Đóng trình phát"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              {selectedTrack.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedTrack.youtubeId}?autoplay=1`}
                  title={selectedTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                  Không thể tải video.
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>Thư giãn và tận hưởng giai điệu chill.</span>
              <button
                onClick={handleRandomPick}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium text-xs"
              >
                <Shuffle className="w-3 h-3" />
                Bài tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
