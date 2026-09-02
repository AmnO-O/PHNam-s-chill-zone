"use client";

import { useEffect, useState } from "react";
import { List, X, ChevronRight } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  contentHtml: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BlogTableOfContents({
  contentHtml,
  isOpen,
  onClose,
}: BlogTableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse h2 and h3 from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const headingElements = doc.querySelectorAll("h2, h3");

    const items: TocItem[] = [];
    headingElements.forEach((el, index) => {
      const text = el.textContent || "";
      if (!text.trim()) return;

      // Generate a slug ID
      const slug =
        el.id ||
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") ||
        `section-${index + 1}`;

      items.push({
        id: slug,
        text,
        level: el.tagName.toLowerCase() === "h2" ? 2 : 3,
      });
    });

    setHeadings(items);

    // Also assign IDs to actual DOM headings in the article
    const articleHeadings = document.querySelectorAll(
      ".prose-custom h2, .prose-custom h3"
    );
    articleHeadings.forEach((el, index) => {
      if (items[index]) {
        el.id = items[index].id;
      }
    });

    // Setup intersection observer to track active section while scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    articleHeadings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [contentHtml]);

  if (headings.length === 0 || !isOpen) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      if (window.innerWidth < 768) {
        onClose();
      }
    }
  };

  return (
    <div className="card rounded-2xl p-4 sm:p-5 my-4 border border-primary/20 bg-primary/5 dark:bg-primary/10 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-3">
        <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
          <List className="w-4 h-4" />
          <span>Mục Lục Bài Viết</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
          title="Đóng mục lục"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="space-y-1">
        {headings.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`w-full text-left flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all ${
              item.level === 3 ? "pl-6 text-[11px]" : ""
            } ${
              activeId === item.id
                ? "bg-primary text-white font-bold shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-surface"
            }`}
          >
            <ChevronRight
              className={`w-3 h-3 shrink-0 ${
                activeId === item.id ? "text-white" : "text-text-tertiary"
              }`}
            />
            <span className="truncate">{item.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
