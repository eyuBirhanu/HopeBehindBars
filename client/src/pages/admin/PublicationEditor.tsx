import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import api from "../../services/api";
import toast from "react-hot-toast";
import SEO from "../../components/common/SEO";

interface PublicationFormData {
  title: string;
  description: string;
  link: string;
  image: FileList;
}

const PublicationEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PublicationFormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const fetchPublication = async () => {
        try {
          const { data } = await api.get(`/api/publications/${id}`);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("link", data.link);
        } catch (error) {
          toast.error("Failed to load publication data.");
        }
      };
      fetchPublication();
    }
  }, [id, isEditing, setValue]);

  const onSubmit: SubmitHandler<PublicationFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const toastId = toast.loading(isEditing ? "Updating..." : "Creating...");
    try {
      if (isEditing) {
        await api.put(`/api/publications/${id}`, formData);
      } else {
        await api.post("/api/publications", formData);
      }
      toast.success(`Publication ${isEditing ? "updated" : "created"}!`, {
        id: toastId,
      });
      navigate("/admin/publications");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed.", {
        id: toastId,
      });
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border px-2 min-h-[45px] border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-brand-sky-blue";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <SEO title="Add/Edit Publication" noIndex={true} />
      <h1 className="font-display text-3xl font-bold mb-8">
        {isEditing ? "Edit" : "Add New"} Publication
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-medium">Publication Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={inputStyles}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="font-medium">
            Description (e.g., "BBC News", "Featured in Forbes")
          </label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
            className={inputStyles}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-medium">Link to Article</label>
          <input
            type="url"
            {...register("link", { required: "A valid URL is required" })}
            placeholder="https://..."
            className={inputStyles}
          />
          {errors.link && (
            <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>
          )}
        </div>
        <div>
          <label className="font-medium">Image Screenshot</label>
          <input
            type="file"
            {...register("image", { required: !isEditing })}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-sky-blue/10 file:text-brand-sky-blue hover:file:bg-brand-sky-blue/20"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/publications")}
            className="bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg hover:bg-gray-300"
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
              ? "Update"
              : "Add Publication"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicationEditor;
