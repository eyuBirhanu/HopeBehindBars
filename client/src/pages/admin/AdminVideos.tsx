import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import type { Video } from "../../types";
import {
  CreateIcon,
  EmptyStateIcon,
  TrashIcon,
  EditIcon,
} from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const AdminVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/videos");
      setVideos(data.videos || []);
    } catch (error) {
      toast.error("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const performDelete = async (id: string) => {
    try {
      await api.delete(`/api/videos/${id}`);
      toast.success("Video deleted successfully!");
      fetchVideos(); 
    } catch (error) {
      toast.error("Failed to delete video.");
    }
  };

  const handleDelete = (id: string, title: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-2">
          <p className="font-bold">Delete "{title}"?</p>
          <p className="text-sm text-gray-600">
            This action cannot be undone and the video will be permanently
            removed.
          </p>
          <div className="mt-2 flex gap-2">
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
      {
        duration: 6000,
      }
    );
  };

  return (
    <div>
      <SEO title="Manage Videos" noIndex={true} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-gray">
          Manage Videos
        </h1>
        <Link
          to="/admin/videos/new"
          className="inline-flex items-center bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg shrink-0"
        >
          <CreateIcon /> Add New Video
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">Loading videos...</p>
      ) : videos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <EmptyStateIcon />
          <h3 className="mt-4 text-lg font-medium">No videos found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first impact video.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {videos.map((video) => (
              <li
                key={video._id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full sm:w-32 h-auto rounded-md flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-bold text-lg text-brand-dark-gray line-clamp-1">
                    {video.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>
                      Category: <strong>{video.category}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Added: {format(new Date(video.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-4 mt-4 sm:mt-0 self-start sm:self-center">
                  <Link
                    to={`/admin/videos/edit/${video._id}`}
                    className="text-brand-sky-blue hover:text-brand-dark-blue"
                    title="Edit"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => handleDelete(video._id, video.title)}
                    className="text-gray-400 hover:text-brand-rose"
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
