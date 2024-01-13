import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import Image from "next/image";
import path from "path";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Blog Starter - Santiego",
  description: "Next.js 14 MDX Blog Starter presented by Santiego",
};

export default async function Home() {
  const entries = await readdir("./content/blog/", { withFileTypes: true });
  const dirs = entries.map((entry) => path.basename(entry.name, ".mdx"));
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile("./content/blog/" + dir + ".mdx", "utf8"))
  );
  const posts = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { data, slug };
  });

  return (
    <div className="container flex flex-col py-3 gap-8 sm:grid sm:grid-cols-4 sm:py-6 relative min-h-screen">
      {posts.map((post) => (
        <div className="flex flex-col" key={post.data.title}>
          <Link href={`/blog/${post.slug}`}>
            <Image
              src={post.data.image}
              alt={post.data.title}
              height={600}
              width={600}
              priority
              className="rounded mb-4 bg-white"
            />
            <p className="font-code text-xs uppercase mb-1">
              {formatDate(post.data.publishedAt)}
            </p>
            <h2 className="font-heading text-heading leading-tight tracking-tight text-2xl">
              {post.data.title}
            </h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
