import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import type { Subscriber } from "../../types";

import {
  TrashIcon,
  CopyIcon,
  EmptyStateIcon,
} from "../../components/common/admin/AdminIcons";

const AdminSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/subscribe");
      setSubscribers(data);
    } catch (error) {
      toast.error("Failed to fetch subscribers.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleCopyAll = () => {
    if (subscribers.length === 0) return;
    const allEmails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(allEmails);
    toast.success("All emails copied to clipboard!");
  };

  const handleCopySingle = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  const handleDelete = (id: string, email: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="font-bold">Delete subscriber?</p>
        <p className="text-sm truncate">
          Email: <strong>{email}</strong>
        </p>
        <div className="mt-2 flex gap-2">
          <button
            className="w-full bg-brand-rose text-white font-bold py-2 px-4 rounded-lg text-sm"
            onClick={() => {
              performDelete([id]);
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

  const performDelete = async (ids: string[]) => {
    try {
      await api.delete("/api/subscribe", { data: { ids } });
      toast.success("Subscriber(s) deleted.");
      fetchSubscribers();
    } catch (error) {
      toast.error("Failed to delete subscriber(s).");
      console.error(error);
    }
  };

  const EmptyState = () => (
    <div className="text-center py-16 px-4">
      <EmptyStateIcon />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        No subscribers yet
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        When users subscribe to your newsletter, their emails will appear here.
      </p>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-brand-dark-gray">
          Newsletter Subscribers
        </h1>
        {subscribers.length > 0 && (
          <button
            onClick={handleCopyAll}
            className="bg-brand-sky-blue text-white font-bold py-2 px-4 rounded-lg text-sm"
          >
            Copy All Emails ({subscribers.length})
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  Loading subscribers...
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {sub.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(sub.createdAt), "MMMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => handleCopySingle(sub.email)}
                        className="text-gray-400 hover:text-brand-sky-blue"
                        title="Copy email"
                      >
                        <CopyIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(sub._id, sub.email)}
                        className="text-gray-400 hover:text-brand-rose"
                        title="Delete subscriber"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscribers;
