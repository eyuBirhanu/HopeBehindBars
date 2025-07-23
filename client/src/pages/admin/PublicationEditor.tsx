import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SEO from "../../components/common/SEO";
import api from "../../services/api";

interface PublicationFormData {
  title: string;
  description: string;
  link: string;
  publicationDate: string;
  image: FileList;
}

const PublicationEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PublicationFormData>();
  const navigate = useNavigate();

  // Fetch existing data for editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchPublication = async () => {
        try {
          const { data } = await api.get(`/api/publications/${id}`);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("link", data.link);
          // Format date correctly for the date input field (YYYY-MM-DD)
          setValue(
            "publicationDate",
            new Date(data.publicationDate).toISOString().split("T")[0]
          );
        } catch (error) {
          toast.error("Failed to load publication data.");
          navigate("/admin/publications");
        }
      };
      fetchPublication();
    }
  }, [id, isEditing, setValue, navigate]);

  const onSubmit: SubmitHandler<PublicationFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("publicationDate", data.publicationDate);

    // Only append the image if one was selected
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const toastId = toast.loading(
      isEditing ? "Updating publication..." : "Creating publication..."
    );
    try {
      if (isEditing) {
        await api.put(`/api/publications/${id}`, formData);
        toast.success("Publication updated!", { id: toastId });
      } else {
        await api.post("/api/publications", formData);
        toast.success("Publication created!", { id: toastId });
      }
      navigate("/admin/publications");
    } catch (error: any) {
      // Display the specific error message from the backend
      const message =
        error.response?.data?.message || "Operation failed. Please try again.";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <>
      <SEO
        title={isEditing ? "Edit Publication" : "Create Publication"}
        noIndex={true}
      />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit" : "Create"} Publication
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Publication Link (URL)
            </label>
            <input
              type="url"
              id="link"
              {...register("link", { required: "A valid URL is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue"
            />
            {errors.link && (
              <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="publicationDate"
              className="block text-sm font-medium text-gray-700"
            >
              Publication Date
            </label>
            <input
              type="date"
              id="publicationDate"
              {...register("publicationDate", { required: "Date is required" })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue"
            />
            {errors.publicationDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.publicationDate.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image (Screenshot)
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: !isEditing })}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-sky-blue/10 file:text-brand-sky-blue hover:file:bg-brand-sky-blue/20"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/publications")}
              className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-dark-blue text-white font-bold py-2.5 px-6 rounded-lg disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Publication"
                : "Create Publication"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PublicationEditor;
