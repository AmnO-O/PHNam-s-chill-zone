"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Home, BookOpen, Music, User, Send, MessageCircle } from "lucide-react";

// Clean inline SVGs for brand icons
const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const navLinks = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Bài viết", href: "/blog", icon: BookOpen },
  { name: "Âm nhạc", href: "/music", icon: Music },
  { name: "Trò chuyện", href: "/chat", icon: MessageCircle },
  { name: "Về mình", href: "/about", icon: User },
];

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/pham.huu.nam.AmnOO/", icon: FacebookIcon },
  { name: "GitHub", href: "https://github.com/AmnO-O", icon: GitHubIcon },
  { name: "Locket", href: "https://locket.camera/links/F2x8hSAXUQcYy41m7", icon: MessageCircle },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/90 shadow-sm backdrop-blur-xl border-b border-border py-2.5"
            : "bg-surface/75 backdrop-blur-xl border-b border-border py-3"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[44px]">
            {/* Left: Logo & Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all">
                <Image
                  src="/assets/images/hcmus_avatar.jpg"
                  alt="Avatar"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-text-primary tracking-tight group-hover:text-primary transition-colors leading-none">
                  Chill Zone
                </span>
                <span className="text-[10px] text-text-tertiary font-medium leading-tight mt-0.5">
                  Phạm Hữu Nam
                </span>
              </div>
            </Link>

            {/* Center: Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 bg-secondary/60 p-1 rounded-2xl border border-border">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-white bg-primary shadow-xs"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Desktop Socials & Theme Toggle */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-text-tertiary hover:text-primary transition-colors rounded-xl hover:bg-secondary"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
              <div className="pl-2 border-l border-border">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Actions Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-xl hover:bg-secondary focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl transition-all duration-300 md:hidden pt-20 px-6 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-between h-[calc(100vh-100px)] py-6">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-lg font-bold rounded-2xl transition-all ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Anonymous message link */}
            <a
              href="https://link-it.me/s/5d8034a4-c0bb-4e8c-84ed-2b6f29cbce12"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-lg font-bold text-rose-500 bg-rose-500/10 rounded-2xl"
            >
              <Send className="w-5 h-5" />
              <span>Gửi tin nhắn ẩn danh</span>
            </a>
          </nav>

          {/* Mobile Bottom Socials */}
          <div className="pt-6 border-t border-border flex items-center justify-around">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-text-secondary hover:text-primary bg-secondary rounded-2xl transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
