"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  slug: string;
  category: string;
};

export default function ContentHub() {
  const [blog, setBlog] = useState<Post[]>([]);
  const [articles, setArticles] = useState<Post[]>([]);
  const [resources, setResources] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts("blog", setBlog);
    fetchPosts("article", setArticles);
    fetchPosts("resource", setResources);
  }, []);

  const fetchPosts = async (category: string, setter: any) => {
    const res = await fetch(
      `http://localhost:5000/api/posts?category=${category}`
    );
    const data = await res.json();
    setter(data.slice(0, 3)); // latest 3
  };

  const renderSection = (title: string, color: string, posts: Post[], link: string) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

      <h2 className={`text-2xl font-bold mb-4 ${color}`}>
        {title}
      </h2>

      <div className="space-y-3 mb-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/content/${post.category}/${post.slug}`}>
            <p className="text-white/80 hover:text-white cursor-pointer">
              • {post.title}
            </p>
          </Link>
        ))}
      </div>

      <Link href={link}>
        <button className="hover:underline text-white/60">
          View All →
        </button>
      </Link>

    </div>
  );

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 md:px-16 py-24">

      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Knowledge Hub
          </span>
        </h1>
      </section>

      {/* GRID */}
      <section className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {renderSection("Blog", "text-cyan-400", blog, "/content/blog")}

        {renderSection("Articles", "text-purple-400", articles, "/content/articles")}

        {renderSection("Resources", "text-pink-400", resources, "/content/resources")}

      </section>

    </main>
  );
}