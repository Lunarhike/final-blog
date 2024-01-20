import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path";
import Link from "next/link";
import Image from "next/image";

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
    <div className="container flex flex-col space-y-4">
      <Link
        href={`/blog/${posts[0].slug}`}
        className="h-[450px] w-full grid grid-cols-2 rounded-xl overflow-hidden mt-6 hover:outline group"
      >
        <div className="flex flex-col space-y-4 m-6">
          <p className="uppercase font-code tracking-tight">REVIEW</p>
          <h2 className="text-5xl font-heading leading-[1.2] tracking-tighter font-semibold">
            {posts[0].data.title}
          </h2>
          <p className="flex-1 pt-6 overflow-auto text-lg tracking-tight leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
            dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque
            minus soluta, voluptates neque explicabo tempora nisi culpa eius
            atque dignissimos. Molestias explicabo corporis voluptatem?
          </p>
          <p className="uppercase font-code tracking-tight">
            {posts[0].data.publishedAt}
          </p>
        </div>
        <div className="relative m-6">
          <Image
            className="object-cover rounded-xl object-right"
            src={posts[0].data.image}
            fill
            alt="Office"
          />
        </div>
      </Link>
      <div className=" grid grid-cols-2 gap-4 py-4 xl:grid-cols-3">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="relative flex overflow-hidden rounded-lg group hover:outline"
          >
            <div className="relative">
              <div className="relative aspect-square m-6 mb-0">
                <Image
                  className="object-cover object-center rounded-lg"
                  fill
                  alt={post.data.title}
                  src={post.data.image}
                />
              </div>
              <div className="p-4 sm:p-6">
                <time className="text-xs uppercase font-code">
                  {post.data.publishedAt}
                </time>
                <h3 className="mt-0.5 font-heading text-xl font-medium">
                  {post.data.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm/relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dolores, possimus pariatur animi temporibus
                  nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                  quidem, mollitia itaque minus soluta, voluptates neque
                  explicabo tempora nisi culpa eius atque dignissimos. Molestias
                  explicabo corporis voluptatem?
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
