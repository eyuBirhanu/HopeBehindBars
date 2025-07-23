import React, { useState, useEffect, useMemo, useCallback } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import type { VolunteerApplication } from "../../types";

import { TrashIcon, CloseIcon } from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const CopyableField = ({
  text,
  label,
}: {
  text?: string | null;
  label: string;
}) => {
  if (!text) return null;
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };
  return (
    <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
      <span className="text-gray-500">{label}:</span>
      <span
        className="font-medium text-gray-800 cursor-pointer hover:text-brand-sky-blue"
        title={`Click to copy ${text}`}
        onClick={handleCopy}
      >
        {text}
      </span>
    </div>
  );
};

// --- The Details Modal Component ---
const VolunteerDetailsModal = ({
  app,
  onClose,
  onStatusChange,
}: {
  app: VolunteerApplication | null;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}) => {
  if (!app) return null;
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
              {app.fullName}
            </h2>
            <p className="text-sm text-gray-500">Application Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <CopyableField label="Email" text={app.email} />
          <CopyableField label="Phone" text={app.phone} />
          <CopyableField label="LinkedIn" text={app.linkedin} />
          <CopyableField label="Twitter" text={app.twitter} />
          <div className="text-sm py-2 border-b border-gray-100">
            <span className="text-gray-500">Interest:</span>
            <p className="font-medium text-gray-800 mt-1">{app.interest}</p>
            {app.skillSet && (
              <p className="text-xs mt-1 pl-2 border-l-2 border-gray-200">
                Skills: {app.skillSet}
              </p>
            )}
            {app.otherInterestDetail && (
              <p className="text-xs mt-1 pl-2 border-l-2 border-gray-200">
                Details: {app.otherInterestDetail}
              </p>
            )}
          </div>
          <div className="text-sm py-2 border-b border-gray-100">
            <span className="text-gray-500">Availability</span>
            <p className="font-medium text-gray-800 mt-1">{app.availability}</p>
          </div>
          <div className="text-sm py-2">
            <span className="text-gray-500">Motivation:</span>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
              {app.motivation}
            </p>
          </div>
        </div>
        <div className="p-6 border-t mt-auto bg-gray-50 flex justify-between items-center">
          <div>
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-500 mr-2"
            >
              Status:
            </label>
            <select
              id="status"
              value={app.status}
              onChange={(e) => onStatusChange(app._id, e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue"
            >
              <option>Pending</option>
              <option>Contacted</option>
              <option>Accepted</option>
              <option>Rejected</option>
              <option>Canceled</option>
            </select>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminVolunteers = () => {
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(
    null
  );

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/volunteer");
      setApplications(data);
    } catch (error) {
      toast.error("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? applications.map((app) => app._id) : []);
  };

  const performAction = async (action: "cancel" | "delete", ids: string[]) => {
    const actionText = action === "cancel" ? "canceled" : "deleted";
    const toastId = toast.loading(`Processing action...`);
    try {
      if (action === "delete") {
        await api.delete("/api/volunteer", { data: { ids } });
      } else {
        await api.put("/api/volunteer/status", { ids, status: "Canceled" });
      }
      toast.success(`Selected applications have been ${actionText}.`, {
        id: toastId,
      });
      fetchApplications();
      setSelectedIds([]);
    } catch (error) {
      toast.error(`Failed to ${action} applications.`, { id: toastId });
    }
  };

  const confirmDelete = (id: string, name: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4 p-2">
        <p className="font-bold">Delete application from "{name}"?</p>
        <p className="text-sm">
          This action is permanent and cannot be undone.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            className="w-full bg-brand-rose text-white font-bold py-2 px-4 rounded-lg text-sm"
            onClick={() => {
              performAction("delete", [id]);
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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.put("/api/volunteer/status", { ids: [id], status });
      toast.success("Status updated!");
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status: status as VolunteerApplication["status"] }
            : app
        )
      );
      setSelectedApp((prev) =>
        prev
          ? { ...prev, status: status as VolunteerApplication["status"] }
          : null
      );
    } catch (error) {
      toast.error("Failed to update status.");
      fetchApplications();
    }
  };

  const isAllSelected = useMemo(
    () => applications.length > 0 && selectedIds.length === applications.length,
    [applications, selectedIds]
  );

  return (
    <>
      <SEO title="Volunteer Applications" noIndex={true} />
      <VolunteerDetailsModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onStatusChange={handleStatusChange}
      />
      <div>
        <h1 className="text-3xl font-bold text-brand-dark-gray mb-6">
          Volunteer Applications
        </h1>

        {/* --- Bulk Actions Bar --- */}
        <div
          className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-brand-dark-gray text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-6 transition-all duration-300 ${
            selectedIds.length > 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <span className="font-semibold">{selectedIds.length} selected</span>
          <div className="h-6 w-px bg-white/20"></div>
          <button
            onClick={() => performAction("cancel", selectedIds)}
            className="hover:text-brand-sky-blue"
          >
            Mark as Canceled
          </button>
          <button
            onClick={() => performAction("delete", selectedIds)}
            className="hover:text-brand-rose"
          >
            Delete
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="text-sm text-gray-400 hover:text-white"
          >
            Clear
          </button>
        </div>

        {/* --- Applications Table --- */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app._id}
                    className={`${
                      app.status === "Canceled"
                        ? "bg-gray-50 text-gray-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedIds.includes(app._id)}
                        onChange={() => handleSelectOne(app._id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`font-medium ${
                          app.status === "Canceled"
                            ? "line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {app.fullName}
                      </div>
                      {app.age && <div className="text-sm">Age: {app.age}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <CopyableField text={app.email} label="Email" />
                    </td>
                    <td className="px-6 py-4 text-sm">{app.interest}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : app.status === "Rejected" ||
                              app.status === "Canceled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {format(new Date(app.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-brand-sky-blue hover:underline disabled:text-gray-300"
                          disabled={app.status === "Canceled"}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => confirmDelete(app._id, app.fullName)}
                          className="text-gray-400 hover:text-brand-rose"
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
    </>
  );
};

export default AdminVolunteers;
