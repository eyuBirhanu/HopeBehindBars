import React from "react";
import { Link } from "react-router-dom";
import type { Blog } from "../../types";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
        <p className="text-gray-500 text-sm mt-1">By {blog.author}</p>
        <p className="mt-4 text-gray-600">{blog.excerpt}</p>
        <div className="mt-6 flex justify-between items-center">
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-500 font-semibold hover:underline"
          >
            Read More
          </Link>
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{blog.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
