import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { format } from "date-fns";
import SEO from "../../components/common/SEO";

interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  images: FileList;
  eventDate: string;
}

const GalleryEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormData>();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (isEditing) {
      const fetchItem = async () => {
        try {
          const { data } = await axios.get(`/api/gallery/${id}`);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("category", data.category);
          if (data.eventDate) {
            setValue(
              "eventDate",
              format(new Date(data.eventDate), "yyyy-MM-dd")
            );
          }
        } catch (error) {
          toast.error("Failed to load gallery item.");
          navigate("/admin/gallery");
        }
      };
      fetchItem();
    }
  }, [id, isEditing, setValue, navigate]);

  const onSubmit: SubmitHandler<GalleryFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("eventDate", data.eventDate);

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) =>
        formData.append("images", file)
      );
    }

    const toastId = toast.loading(
      isEditing ? "Updating item..." : "Creating item..."
    );
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      if (isEditing) {
        await axios.put(`/api/gallery/${id}`, formData, config);
        toast.success("Gallery item updated!", { id: toastId });
      } else {
        await axios.post("/api/gallery", formData, config);
        toast.success("Gallery item created!", { id: toastId });
      }
      navigate("/admin/gallery");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Operation failed. Please try again.";
      toast.error(errorMessage, { id: toastId });
      console.error(error);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md px-2 border min-h-[45px] border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-brand-sky-blue";

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <SEO title="Add/Edit Gallery Item" noIndex={true} />
      <h1 className="font-display text-3xl font-bold mb-8">
        {isEditing ? "Edit" : "Create"} Gallery Item
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
            className={inputStyles}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
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
            rows={6}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={inputStyles}
            >
              <option value="">Select a category...</option>
              <option value="Partnerships">Partnerships</option>
              <option value="Education">Education</option>
              <option value="Support">Support</option>
              <option value="Skills Training">Skills Training</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Event
            </label>
            <input
              type="date"
              id="eventDate"
              {...register("eventDate", { required: "Date is required" })}
              className={inputStyles}
            />
            {errors.eventDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.eventDate.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images (select one or multiple)
          </label>
          <input
            type="file"
            multiple
            id="images"
            {...register("images", { required: !isEditing })}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-sky-blue/10 file:text-brand-sky-blue hover:file:bg-brand-sky-blue/20"
          />
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>
          )}
          {isEditing && (
            <p className="text-xs text-gray-500 mt-1">
              Uploading new images will replace existing ones.
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/gallery")}
            className="bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-lg transition-colors hover:bg-gray-300"
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
              ? "Update Item"
              : "Create Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryEditor;
