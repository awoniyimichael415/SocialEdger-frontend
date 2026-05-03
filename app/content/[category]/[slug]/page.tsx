"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ContentPost() {
  const { slug, category } = useParams();
  const [post, setPost] = useState<any>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${BACKEND_URL}/api/posts/${slug}`);
      const data = await res.json();

      console.log("POST DATA:", data);

      setPost(data);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center text-white py-20">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 md:px-16 py-24">

      {/* ================= HEADER ================= */}
      <div className="max-w-3xl mx-auto text-center mb-10">

        <span className="text-sm uppercase tracking-widest text-cyan-400">
          {category}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-gray-400">
            {post.excerpt}
          </p>
        )}

      </div>

      {/* ================= COVER IMAGE (FIXED) ================= */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto mb-14">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto rounded-2xl border border-white/10 shadow-lg"
          />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="max-w-3xl mx-auto">

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </div>

    </main>
  );
}