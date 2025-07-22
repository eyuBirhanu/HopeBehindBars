import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import type { Blog } from "../types";
import { format } from "date-fns";

const LinkedInIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const SingleBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/api/blogs/${id}`);
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading Post...</div>;
  if (!blog) return <div className="text-center py-20">Post not found.</div>;

  return (
    <main className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              to="/blog"
              className="text-sm font-semibold text-brand-sky-blue hover:underline"
            >
              ← Back to All Posts
            </Link>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-brand-dark-gray">
              {blog.title}
            </h1>
          </div>

          {/* Feature Image */}
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
          />

          {/* Author/Date Info */}
          <div className="flex items-center gap-4 my-8 border-y py-4">
            <div>
              <p className="font-bold text-brand-dark-gray">
                {blog.authorName}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(blog.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
            {blog.authorLinkedin && (
              <a
                href={blog.authorLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-sky-blue transition"
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            )}
          </div>

          {/* Render HTML Content from TipTap */}
          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </main>
  );
};

export default SingleBlogPage;
