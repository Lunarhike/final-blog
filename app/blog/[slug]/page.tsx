import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import rehypeShikiji from "rehype-shikiji";

async function getAuthorDetails(authorsList) {
  // If authorsList is empty or not provided, return an empty array
  if (!authorsList || authorsList.length === 0) {
    return [];
  }

  let authorsDetails = [];

  for (const authorName of authorsList) {
    // Construct the path to the author's metadata file
    const authorFilename = `./content/authors/${authorName.toLowerCase()}.mdx`; // Ensure the path is lowercase

    try {
      // Read the author's metadata file
      const authorFile = await readFile(authorFilename, "utf8");
      const { data: authorData } = matter(authorFile);

      // Store the necessary details
      authorsDetails.push({
        name: authorName,
        avatar: authorData.avatar,
        linkedIn: authorData.linkedIn,
      });
    } catch (error) {
      console.error(`Error reading author file for ${authorName}:`, error);
    }
  }

  return authorsDetails;
}

export default async function PostPage({ params }) {
  const filename = "./content/blog/" + params.slug + ".mdx";
  const file = await readFile(filename, "utf8");
  const { content, data } = matter(file);
  const authorsInfo = await getAuthorDetails(data.authors);

  return (
    <main className="container py-3 lg:py-6 max-w-[650px]">
      {data.publishedAt && (
        <time
          dateTime={data.publishedAt}
          className="block text-sm font-code tracking-tight text-muted-foreground"
        >
          Published on {formatDate(data.publishedAt)}
        </time>
      )}
      <h1 className="mt-2 font-heading font-semibold inline-block text-4xl leading-10 xs:leading-tight tracking-tight lg:text-5xl ">
        {data.title}
      </h1>
      <div className="mt-4 flex space-x-4">
        {authorsInfo.map((author) => (
          <Link
            key={author.name}
            href={`https://www.linkedin.com/in/${author.linkedIn}`}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              priority
              src={author.avatar}
              alt={author.name}
              width={42}
              height={42}
              className="rounded-full"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{author.name}</p>
              <p className="text-[12px] text-muted-foreground">@LinkedIn</p>
            </div>
          </Link>
        ))}
      </div>

      {data.image && (
        <Image
          src={data.image}
          alt={data.title}
          width={620}
          height={400}
          className="mt-8 object-cover object-center mb-4 rounded-md bg-card transition-colors"
          priority
        />
      )}
      <div className="prose dark:prose-invert prose-zinc py-4">
        <Mdx
          source={content}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              rehypePlugins: [
                [
                  rehypeShikiji,
                  {
                    themes: {
                      dark: "poimandres",
                      light: "github-light",
                    },
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./content/blog", { withFileTypes: true });
  const dirs = entries.map((entry) => path.basename(entry.name, ".mdx"));
  return dirs.map((dir) => ({ slug: dir }));
}
