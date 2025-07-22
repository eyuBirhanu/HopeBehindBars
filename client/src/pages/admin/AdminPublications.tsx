import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import type { Publication } from "../../types";
import {
  CreateIcon,
  EmptyStateIcon,
  TrashIcon,
  EditIcon,
} from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const AdminPublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/publications");
      setPublications(data || []);
    } catch (error) {
      toast.error("Failed to fetch publications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const handleDelete = (id: string, title: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-2">
        <p className="font-bold">Delete "{title}"?</p>
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
    ));
  };

  const performDelete = async (id: string) => {
    try {
      await api.delete(`/api/publications/${id}`);
      toast.success("Publication deleted!");
      fetchPublications();
    } catch (error) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div>
      <SEO title="Manage Publications" noIndex={true} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-gray">
          Manage Publications
        </h1>
        <Link
          to="/admin/publications/new"
          className="inline-flex items-center bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg"
        >
          <CreateIcon /> Add New
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : publications.length === 0 ? (
        <div className="text-center py-16">
          <EmptyStateIcon />
          <h3 className="mt-2 text-lg font-medium">No publications found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add your first publication or news feature.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {publications.map((pub) => (
              <li
                key={pub._id}
                className="p-4 sm:p-6 flex items-center gap-4 hover:bg-gray-50/50"
              >
                <img
                  src={pub.imageUrl}
                  alt={pub.title}
                  className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-bold text-lg text-brand-dark-gray">
                    {pub.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {pub.description}
                  </p>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-sky-blue hover:underline truncate block"
                  >
                    {pub.link}
                  </a>
                </div>
                <div className="flex-shrink-0 flex items-center gap-4">
                  <Link
                    to={`/admin/publications/edit/${pub._id}`}
                    className="text-brand-sky-blue hover:text-brand-dark-blue"
                    title="Edit"
                  >
                    <EditIcon />
                  </Link>
                  <button
                    onClick={() => handleDelete(pub._id, pub.title)}
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

export default AdminPublications;
