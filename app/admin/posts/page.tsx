"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

export default function AdminPosts() {
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "blog",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your content...</p>",
    immediatelyRender: false,
  });

  if (!mounted) return null;

  // ================= IMAGE SELECT =================
  const handleImageChange = (file: File | null) => {
    if (!file) return;

    setImageFile(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      // 🔥 STEP 1: UPLOAD IMAGE
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch(`${BACKEND_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        console.log("UPLOAD RESPONSE:", uploadData);

        if (!uploadData.url) {
          alert("Image upload failed");
          return;
        }

        imageUrl = uploadData.url;
      }

      console.log("FINAL IMAGE URL:", imageUrl);

      // 🔥 STEP 2: GET CONTENT
      const content = editor?.getHTML();

      // 🔥 STEP 3: CREATE POST
      const res = await fetch(`${BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ADMIN_SECRET",
        },
        body: JSON.stringify({
          ...form,
          content,
          coverImage: imageUrl,
        }),
      });

      const data = await res.json();

      console.log("POST RESPONSE:", data);

      alert("Post Created!");

      // 🔥 RESET FORM
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        category: "blog",
      });

      setImageFile(null);
      setPreview("");

      editor?.commands.setContent("<p>Write your content...</p>");

    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto text-white">

      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      {/* ================= FORM ================= */}
      <div className="space-y-4">

        <input
          placeholder="Title"
          value={form.title}
          className="w-full p-3 rounded bg-black border border-white/10"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Slug (e.g my-post)"
          value={form.slug}
          className="w-full p-3 rounded bg-black border border-white/10"
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <input
          placeholder="Excerpt"
          value={form.excerpt}
          className="w-full p-3 rounded bg-black border border-white/10"
          onChange={(e) =>
            setForm({ ...form, excerpt: e.target.value })
          }
        />

        {/* ================= IMAGE ================= */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full p-3 rounded bg-black border border-white/10"
            onChange={(e) =>
              handleImageChange(e.target.files?.[0] || null)
            }
          />

          {preview && (
            <img
              src={preview}
              className="mt-4 rounded-xl w-full h-48 object-cover border border-white/10"
            />
          )}
        </div>

        {/* ================= CATEGORY ================= */}
        <select
          value={form.category}
          className="w-full p-3 rounded bg-black border border-white/10"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="blog">Blog</option>
          <option value="article">Article</option>
          <option value="resource">Resource</option>
        </select>

      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="flex gap-2 mt-6 flex-wrap">

        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          Bold
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 bg-gray-800 rounded"
        >
          H2
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          List
        </button>

      </div>

      {/* ================= EDITOR ================= */}
      <div className="bg-white text-black rounded-lg p-4 mt-4 min-h-[250px]">
        {editor && <EditorContent editor={editor} />}
      </div>

      {/* ================= SUBMIT ================= */}
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg hover:scale-105 transition"
      >
        Publish Post
      </button>

    </main>
  );
}