import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Blog } from "../types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { EmptyStateIcon } from "../components/common/admin/AdminIcons"; // Reusing a nice icon
import SEO from "../components/common/SEO";

// --- Reusable Blog Card Component (No changes needed) ---
const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => (
  <Link
    to={`/blog/${blog._id}`}
    className="block group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
  >
    <div className="h-48 overflow-hidden">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-6">
      <p className="text-sm text-brand-sky-blue font-semibold">
        {format(new Date(blog.createdAt), "MMMM d, yyyy")}
      </p>
      <h3 className="mt-2 text-xl font-bold text-brand-dark-gray line-clamp-2">
        {blog.title}
      </h3>
      <p className="mt-3 text-gray-600 line-clamp-3">{blog.excerpt}</p>
      <p className="mt-4 text-sm font-bold text-brand-dark-gray group-hover:text-brand-sky-blue transition">
        Read More →
      </p>
    </div>
  </Link>
);

// --- Main Blog Page Component (Updated) ---
const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/blogs");
        setBlogs(data || []); // Ensure blogs is an array even if data is null/undefined
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        setBlogs([]); // Set to empty on error
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // A dedicated component for the empty state for cleaner code
  const NoBlogsFound = () => (
    <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <EmptyStateIcon />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        No Blog Posts Yet
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        We're working on new stories of hope and impact. Please check back soon!
      </p>
    </div>
  );

  return (
    <main className="bg-neutral-light min-h-screen">
      <SEO
        title="Our Blog"
        description="Read stories of hope, change, and impact from the field. Our blog features updates on our programs, personal testimonials, and insights into our work."
        url="/blog"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-brand-dark-gray">
            Our Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stories of hope, change, and impact from the front lines.
          </p>
        </div>

        {loading ? (
          // A simple loading skeleton for a better visual experience
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          // Render the grid of blogs if they exist
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          // Render the empty state message if no blogs exist
          <NoBlogsFound />
        )}
      </div>
    </main>
  );
};

export default BlogPage;
