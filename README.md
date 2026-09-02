# 🌌 PHNam's Chill Zone

> A cozy, modern, and aesthetically pleasing personal haven to relax, listen to chill music, explore daily idioms/quotes, and read personal stories.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**. Ready for **Vercel** instant deployment.

---

## ✨ Features & Redesign Highlights

- **Bento Grid Dashboard**: Sleek, modern cards with subtle glassmorphism and ambient glows.
- **🎵 Chill Music Lounge**:
  - 30+ curated Lo-Fi, Acoustic, and Viet Chill tracks.
  - Interactive "Random Track" picker.
  - Built-in embedded player modal and direct YouTube launcher.
- **💬 Daily Quote & Idioms Generator**:
  - 30+ curated Vietnamese & English quotes and idioms.
  - Shuffle animations, category badges, and instant "Copy to Clipboard" with toast feedback.
- **📖 Stories & Thoughts Blog Reader**:
  - Powered by Markdown (`_posts/`) and parsed with `gray-matter` & `remark`.
  - Reading time calculator, category tags, responsive hero images, and smooth typography.
  - Horizontal story carousel on the homepage and search/tag filtering on `/blog`.
- **🌙 Cozy Dark & Light Mode**: Smooth theme transitions with `next-themes` and local persistence.
- **📱 Responsive & Mobile-Ready**: Elegant slide-out drawer on mobile screens.

---

## 📁 Modern Project Structure

```text
PHNam-s-chill-zone/
├── _posts/                 # Markdown stories & articles
├── public/                 # Static assets (images, avatars)
│   └── assets/images/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global styles, variables & dark mode
│   │   ├── layout.tsx      # Root layout with Sidebar & ThemeProvider
│   │   ├── page.tsx        # Homepage Bento Grid
│   │   ├── about/          # About Me page
│   │   ├── blog/           # Blog list & [slug] reader
│   │   ├── music/          # Full Music Lounge page
│   │   └── not-found.tsx   # 404 page
│   ├── components/         # Modular UI Components
│   │   ├── BlogCarousel.tsx
│   │   ├── BlogList.tsx
│   │   ├── Footer.tsx
│   │   ├── MusicLounge.tsx
│   │   ├── MusicWidget.tsx
│   │   ├── QuoteWidget.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/               # Typed data stores
│   │   ├── music.ts
│   │   └── quotes.ts
│   ├── lib/                # Server utilities (post parser)
│   │   └── posts.ts
│   └── types/              # TypeScript interfaces
│       └── index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Check Types & Production Build**:
   ```bash
   npm run type-check
   npm run build
   ```

---

## 🌐 Deploying to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "Modernize Chill Zone with Next.js, TypeScript and Bento UI"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your `PHNam-s-chill-zone` GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Click **Deploy**! ✨
