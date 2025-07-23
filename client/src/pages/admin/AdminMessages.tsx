import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import type { Message } from "../../types";
import { TrashIcon, CloseIcon } from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const MessageDetailsModal = ({
  message,
  onClose,
  onDelete,
}: {
  message: Message | null;
  onClose: () => void;
  onDelete: (id: string, name: string) => void;
}) => {
  if (!message) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark-gray">
              {message.name}
            </h2>
            <p className="text-sm text-gray-500">{message.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
        </div>
        <div className="p-4 border-t mt-auto bg-gray-50 flex justify-end">
          <button
            onClick={() => {
              onDelete(message._id, message.name);
              onClose();
            }}
            className="bg-brand-rose text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <TrashIcon /> Delete Message
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/messages/admin");
      setMessages(data || []);
    } catch (error) {
      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const performDelete = async (id: string) => {
    try {
      await api.delete(`/api/messages/admin/${id}`);
      toast.success("Message deleted!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete message.");
    }
  };

  const confirmDelete = (id: string, name: string) => {
    toast((t) => (
      <div>
        <p>
          Delete message from <strong>{name}</strong>?
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="w-full bg-brand-rose ..."
            onClick={() => {
              performDelete(id);
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
          <button
            className="w-full bg-gray-200 ..."
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <SEO title="Contact Messages" noIndex={true} />
      <MessageDetailsModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
        onDelete={confirmDelete}
      />
      <div>
        <h1 className="text-3xl font-bold text-brand-dark-gray mb-6">
          Contact Messages
        </h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {loading ? (
              <li className="p-4 text-center">Loading...</li>
            ) : messages.length === 0 ? (
              <li className="p-4 text-center">No messages yet.</li>
            ) : (
              messages.map((msg) => (
                <li
                  key={msg._id}
                  className={`p-4 flex justify-between items-center hover:bg-gray-50/50 ${
                    !msg.isRead && "bg-brand-sky-blue/5"
                  }`}
                >
                  <div>
                    <p
                      className={`font-bold ${
                        !msg.isRead && "text-brand-dark-blue"
                      }`}
                    >
                      {msg.name}
                    </p>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(msg.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedMessage(msg)}
                      className="text-sm font-semibold text-brand-sky-blue hover:underline"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => confirmDelete(msg._id, msg.name)}
                      className="text-gray-400 hover:text-brand-rose"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminMessages;
