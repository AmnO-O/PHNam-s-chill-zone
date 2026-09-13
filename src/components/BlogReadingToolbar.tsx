"use client";

import { Maximize2, Minimize2 } from "lucide-react";

export type FontSizeOption = "sm" | "base" | "lg" | "xl";
export type FontFamilyOption = "sans" | "serif";

interface BlogReadingToolbarProps {
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  fontFamily: FontFamilyOption;
  setFontFamily: (font: FontFamilyOption) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
}

export function BlogReadingToolbar({
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  isZenMode,
  toggleZenMode,
}: BlogReadingToolbarProps) {
  const fontSizes: { id: FontSizeOption; label: string; desc: string }[] = [
    { id: "sm", label: "A-", desc: "Nhỏ (14px)" },
    { id: "base", label: "A", desc: "Vừa (16px)" },
    { id: "lg", label: "A+", desc: "Lớn (18px)" },
    { id: "xl", label: "A++", desc: "Rất lớn (20px)" },
  ];

  return (
    <div className="space-y-3">
      <div className="text-text-tertiary text-xs font-bold uppercase tracking-wider">
        Tuỳ chọn đọc
      </div>

      {/* Font Size */}
      <div className="flex items-center justify-between gap-1 bg-secondary/80 p-1 rounded-xl">
        {fontSizes.map((size) => (
          <button
            key={size.id}
            onClick={() => setFontSize(size.id)}
            className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
              fontSize === size.id
                ? "bg-surface text-primary shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
            title={size.desc}
            aria-label={size.desc}
          >
            {size.label}
          </button>
        ))}
      </div>

      {/* Font Family (Sans vs Serif) */}
      <div className="flex items-center bg-secondary/80 p-1 rounded-xl gap-1">
        <button
          onClick={() => setFontFamily("sans")}
          className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
            fontFamily === "sans"
              ? "bg-surface text-primary shadow-xs font-bold"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Không chân
        </button>
        <button
          onClick={() => setFontFamily("serif")}
          className={`flex-1 py-1 rounded-lg text-xs font-serif font-semibold transition-all ${
            fontFamily === "serif"
              ? "bg-surface text-primary shadow-xs font-bold"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Trang sách
        </button>
      </div>

      {/* Zen / Focus mode */}
      <button
        onClick={toggleZenMode}
        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
          isZenMode
            ? "bg-rose-500 text-white shadow-xs"
            : "bg-secondary/80 text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        }`}
      >
        {isZenMode ? (
          <>
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Thoát tập trung (Esc)</span>
          </>
        ) : (
          <>
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Chế độ tập trung</span>
          </>
        )}
      </button>
    </div>
  );
}
