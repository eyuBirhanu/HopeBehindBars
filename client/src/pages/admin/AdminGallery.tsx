import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import type { GalleryItem } from "../../types";
import SEO from "../../components/common/SEO";

const CreateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);
const EmptyStateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-12 w-12 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/gallery");
      if (data && Array.isArray(data.images)) {
        setItems(data.images);
      } else if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
        toast.error("Received unexpected data from the server.");
      }
    } catch (error) {
      toast.error("Failed to fetch gallery items.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const performDelete = async (id: string) => {
    try {
      await api.delete(`/api/gallery/${id}`);
      toast.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      toast.error("Failed to delete item.");
    }
  };

  const handleDelete = (id: string, title: string) => {
    toast((t) => (
      <div>
        <p className="font-bold">Delete "{title}"?</p>
        <p className="text-sm">This action cannot be undone.</p>
        <div className="mt-4 flex gap-2">
          <button
            className="w-full bg-brand-rose  text-white font-bold py-2 px-4 rounded-lg text-sm"
            onClick={() => {
              performDelete(id);
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
          <button
            className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const EmptyState = () => (
    <div className="text-center py-16 px-4 bg-white rounded-lg shadow">
      <EmptyStateIcon />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        No gallery items found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating your first item.
      </p>
      <div className="mt-6">
        <Link
          to="/admin/gallery/new"
          className="inline-flex items-center bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg"
        >
          <CreateIcon /> Create New Item
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <SEO title="Manage Gallery" noIndex={true} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-gray">
          Manage Gallery
        </h1>
        <Link to="/admin/gallery/new" className="hidden sm:block">
          <button className="inline-flex items-center bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg">
            <CreateIcon /> Add New Item
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">Loading gallery...</p>
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={item.imageUrls[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/admin/gallery/edit/${item._id}`}
                    className="bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white text-brand-dark-gray"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white text-brand-rose"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p
                  className="font-bold text-gray-800 truncate"
                  title={item.title}
                >
                  {item.title}
                </p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {format(new Date(item.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/admin/gallery/new"
        className="sm:hidden fixed bottom-6 right-6 ..."
      >
        <CreateIcon />
        <span className="sr-only">Add New Item</span>
      </Link>
    </div>
  );
};

export default AdminGallery;
