import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost, BlogPostMeta } from "@/types";

const postsDirectory = path.join(process.cwd(), "_posts");

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} phút đọc`;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      const title = matterResult.data.title || slug;
      let date = matterResult.data.date;
      if (date instanceof Date) {
        date = date.toISOString().split("T")[0];
      } else if (!date) {
        // try to extract date from filename like YYYY-MM-DD
        const match = slug.match(/^(\d{4}-\d{2}-\d{2})/);
        date = match ? match[1] : "2026-01-01";
      } else {
        date = String(date);
      }

      let image = matterResult.data.image || "/assets/images/Blog-images/blog0-all.jpg";
      if (image && !image.startsWith("/") && !image.startsWith("http")) {
        image = `/${image}`;
      }

      const excerpt =
        matterResult.data.description ||
        matterResult.data.excerpt ||
        matterResult.content.slice(0, 140).replace(/#|\[|\]|\n/g, " ").trim() + "...";

      const readingTime = calculateReadingTime(matterResult.content);
      const tags = Array.isArray(matterResult.data.categories)
        ? matterResult.data.categories
        : [];

      return {
        slug,
        title,
        date,
        excerpt,
        image,
        readingTime,
        tags,
      };
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const title = matterResult.data.title || slug;
    let date = matterResult.data.date;
    if (date instanceof Date) {
      date = date.toISOString().split("T")[0];
    } else if (!date) {
      const match = slug.match(/^(\d{4}-\d{2}-\d{2})/);
      date = match ? match[1] : "2026-01-01";
    } else {
      date = String(date);
    }

    let image = matterResult.data.image || "/assets/images/Blog-images/blog0-all.jpg";
    if (image && !image.startsWith("/") && !image.startsWith("http")) {
      image = `/${image}`;
    }

    const excerpt =
      matterResult.data.description ||
      matterResult.data.excerpt ||
      matterResult.content.slice(0, 140).replace(/#|\[|\]|\n/g, " ").trim() + "...";

    const readingTime = calculateReadingTime(matterResult.content);
    const tags = Array.isArray(matterResult.data.categories)
      ? matterResult.data.categories
      : [];

    return {
      slug,
      title,
      date,
      excerpt,
      image,
      readingTime,
      tags,
      contentHtml,
    };
  } catch (err) {
    console.error("Error reading post slug:", slug, err);
    return null;
  }
}
