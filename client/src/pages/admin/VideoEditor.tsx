import  { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import SEO from "../../components/common/SEO";

interface VideoFormData {
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
}

const VideoEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VideoFormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const fetchVideo = async () => {
        try {
          const { data } = await api.get(`/api/videos/${id}`);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue(
            "youtubeUrl",
            `https://www.youtube.com/watch?v=${data.youtubeId}`
          );
          setValue("category", data.category);
        } catch (error) {
          toast.error("Failed to load video data.");
        }
      };
      fetchVideo();
    }
  }, [id, isEditing, setValue]);

  const onSubmit: SubmitHandler<VideoFormData> = async (data) => {
    const toastId = toast.loading(
      isEditing ? "Updating video..." : "Adding video..."
    );
    try {
      if (isEditing) {
        await api.put(`/api/videos/${id}`, data);
        toast.success("Video updated!", { id: toastId });
      } else {
        await api.post("/api/videos", data);
        toast.success("Video added!", { id: toastId });
      }
      navigate("/admin/videos");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed.", {
        id: toastId,
      });
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md min-h-[45px] px-2 border border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-brand-sky-blue";

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <SEO title="Add/Edit Video" noIndex={true} />
      <h1 className="font-display text-3xl font-bold mb-8">
        {isEditing ? "Edit" : "Add"} Video
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="font-medium">
            Video Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className={inputStyles}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
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
          <label htmlFor="youtubeUrl" className="font-medium">
            Full YouTube URL
          </label>
          <input
            id="youtubeUrl"
            placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            {...register("youtubeUrl", { required: "YouTube URL is required" })}
            className={inputStyles}
          />
          {errors.youtubeUrl && (
            <p className="text-red-500 text-xs mt-1">
              {errors.youtubeUrl.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="font-medium">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={inputStyles}
          >
            <option value="">Select a category...</option>
            <option value="Testimonials">Testimonials</option>
            <option value="Program Highlights">Program Highlights</option>
            <option value="Community Stories">Community Stories</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/videos")}
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
              ? "Update Video"
              : "Add Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoEditor;
