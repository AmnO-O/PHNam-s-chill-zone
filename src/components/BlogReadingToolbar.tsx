"use client";

import { Type, Maximize2, Minimize2, BookOpen, List, Check, RotateCcw } from "lucide-react";

export type FontSizeOption = "sm" | "base" | "lg" | "xl";
export type FontFamilyOption = "sans" | "serif";

interface BlogReadingToolbarProps {
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  fontFamily: FontFamilyOption;
  setFontFamily: (font: FontFamilyOption) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
  isTocOpen: boolean;
  toggleToc: () => void;
  hasHeadings: boolean;
}

export function BlogReadingToolbar({
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  isZenMode,
  toggleZenMode,
  isTocOpen,
  toggleToc,
  hasHeadings,
}: BlogReadingToolbarProps) {
  const fontSizes: { id: FontSizeOption; label: string; desc: string }[] = [
    { id: "sm", label: "A-", desc: "Chữ nhỏ (14px)" },
    { id: "base", label: "A", desc: "Mặc định (16px)" },
    { id: "lg", label: "A+", desc: "Chữ lớn (18px)" },
    { id: "xl", label: "A++", desc: "Rất lớn (20px)" },
  ];

  return (
    <aside
      aria-label="Thanh công cụ đọc bài viết"
      className="card rounded-2xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs bg-surface/90 backdrop-blur-md"
    >
      {/* Left: Font Size & Font Family Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Font Size Selector */}
        <div className="flex items-center bg-secondary p-1 rounded-xl gap-0.5" role="group" aria-label="Cỡ chữ">
          <span className="sr-only">Tuỳ chọn cỡ chữ:</span>
          {fontSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setFontSize(size.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                fontSize === size.id
                  ? "bg-primary text-white shadow-xs"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
              title={size.desc}
              aria-label={size.desc}
              aria-pressed={fontSize === size.id}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* Font Style Toggle (Sans vs Serif) */}
        <div className="flex items-center bg-secondary p-1 rounded-xl gap-0.5" role="group" aria-label="Kiểu chữ">
          <span className="sr-only">Tuỳ chọn kiểu chữ:</span>
          <button
            onClick={() => setFontFamily("sans")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              fontFamily === "sans"
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-surface"
            }`}
            title="Font chữ hiện đại (Sans-serif)"
            aria-pressed={fontFamily === "sans"}
          >
            Hiện đại
          </button>
          <button
            onClick={() => setFontFamily("serif")}
            className={`px-3 py-1 rounded-lg text-xs font-serif font-semibold transition-all ${
              fontFamily === "serif"
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-surface"
            }`}
            title="Font trang sách (Serif)"
            aria-pressed={fontFamily === "serif"}
          >
            Trang sách
          </button>
        </div>
      </div>

      {/* Right: TOC & Zen / Focus Mode */}
      <div className="flex items-center gap-2">
        {/* Table of Contents button */}
        {hasHeadings && (
          <button
            onClick={toggleToc}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isTocOpen
                ? "bg-primary text-white shadow-xs"
                : "bg-secondary text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            }`}
            title="Mục lục bài viết"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mục lục</span>
          </button>
        )}

        {/* Zen Focus Mode Button */}
        <button
          onClick={toggleZenMode}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isZenMode
              ? "bg-rose-500 text-white shadow-xs"
              : "bg-secondary text-text-secondary hover:text-text-primary hover:bg-surface-hover"
          }`}
          title={isZenMode ? "Thoát chế độ tập trung (Esc)" : "Chế độ đọc tập trung"}
        >
          {isZenMode ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Thoát Focus</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tập trung</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
