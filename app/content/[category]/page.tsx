"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  createdAt: string;
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`https://socialedger-backend.onrender.com/api/posts?category=${category}`)
      .then((res) => res.json())
      .then(setPosts);
  }, [category]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 md:px-16 py-24">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-16 capitalize text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
        {category}
      </h1>

      {/* POSTS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/content/${category}/${post.slug}`}
          >
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:scale-105 transition cursor-pointer">

              {post.coverImage && (
                <img
                  src={post.coverImage}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  {post.excerpt}
                </p>
              </div>

            </div>
          </Link>
        ))}

      </div>

    </main>
  );
}
