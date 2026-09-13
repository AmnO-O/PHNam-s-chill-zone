"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  contentHtml: string;
}

export function BlogTableOfContents({ contentHtml }: BlogTableOfContentsProps) {
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

      const slug =
        el.id ||
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") ||
        `heading-${index + 1}`;

      items.push({
        id: slug,
        text,
        level: el.tagName.toLowerCase() === "h2" ? 2 : 3,
      });
    });

    setHeadings(items);

    // Sync IDs with DOM elements in prose-custom
    const domHeadings = document.querySelectorAll(".prose-custom h2, .prose-custom h3");
    domHeadings.forEach((el, idx) => {
      if (items[idx]) {
        el.id = items[idx].id;
      }
    });

    // IntersectionObserver to highlight current active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    domHeadings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [contentHtml]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider">
        <List className="w-3.5 h-3.5 text-primary" />
        <span>Mục lục</span>
      </div>

      <nav className="space-y-1 text-xs border-l border-border/80 pl-2">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left py-1 px-2 rounded-md transition-colors block truncate ${
                item.level === 3 ? "pl-4 text-[11px]" : "font-medium"
              } ${
                isActive
                  ? "text-primary font-bold bg-primary/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              }`}
              title={item.text}
            >
              {item.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
