import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import type { Blog } from "../../types";

import {
  CreateIcon,
  EmptyStateIcon,
} from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const AdminBlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/blogs");
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to fetch blog posts.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id: string, title: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to delete: <strong>"{title}"</strong>?
          </p>
          <div className="flex gap-2">
            <button
              className="w-full bg-brand-rose text-white font-bold py-2 px-4 rounded-lg text-sm"
              onClick={() => {
                performDelete(id);
                toast.dismiss(t.id);
              }}
            >
              Confirm Delete
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const performDelete = async (id: string) => {
    try {
      await api.delete(`/api/blogs/${id}`);
      toast.success("Blog post deleted!");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete post.");
      console.error(error);
    }
  };

  const EmptyState = () => (
    <div className="text-center py-16 px-4">
      <EmptyStateIcon />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        No blog posts found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating your first post.
      </p>
      <div className="mt-6">
        <Link to="/admin/blogs/new">
          <button className="inline-flex items-center bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg">
            <CreateIcon />
            Create New Post
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <SEO title="Manage Blogs" noIndex={true} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-gray">
          Manage Blog Posts
        </h1>
        <Link to="/admin/blogs/new">
          <button className="inline-flex items-center bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto">
            <CreateIcon />
            Create New Post
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading posts...
          </div>
        ) : blogs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="divide-y divide-gray-200">
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 rounded-t-lg">
              <div className="md:col-span-4 text-xs font-medium text-gray-500 uppercase">
                Title
              </div>
              <div className="md:col-span-4 text-xs font-medium text-gray-500 uppercase">
                Excerpt
              </div>
              <div className="md:col-span-2 text-xs font-medium text-gray-500 uppercase">
                Created On
              </div>
              <div className="md:col-span-2 text-xs font-medium text-gray-500 uppercase text-right">
                Actions
              </div>
            </div>

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-1 md:col-span-4 text-sm font-medium text-gray-900">
                  {blog.title}
                </div>

                <div className="col-span-1 md:col-span-4 text-sm text-gray-500 truncate">
                  {blog.excerpt}
                </div>

                <div className="col-span-1 md:hidden text-xs text-gray-400">
                  {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                </div>

                <div className="hidden md:block md:col-span-2 text-sm text-gray-500">
                  {format(new Date(blog.createdAt), "MMM d, yyyy")}
                </div>

                <div className="col-span-1 md:col-span-2 text-left md:text-right text-sm font-medium space-x-4">
                  <Link
                    to={`/admin/blogs/edit/${blog._id}`}
                    className="text-brand-sky-blue hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    className="text-brand-rose hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile-only floating action button */}
      <Link
        to="/admin/blogs/new"
        className="sm:hidden fixed bottom-6 right-6 bg-brand-sky-blue p-4 rounded-full shadow-lg text-white"
      >
        <CreateIcon />
        <span className="sr-only">Create New Post</span>
      </Link>
    </div>
  );
};

export default AdminBlogList;
