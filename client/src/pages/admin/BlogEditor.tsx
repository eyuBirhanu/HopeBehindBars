import { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import api from "../../services/api";
import toast from "react-hot-toast";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  H2Icon,
  H3Icon,
  ListIcon,
  QuoteIcon,
} from "../../components/common/admin/AdminIcons";
import SEO from "../../components/common/SEO";

const MenuBar = ({ editor }: { editor: any | null }) => {
  if (!editor) return null;

  const buttonClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors ${
      isActive
        ? "bg-brand-dark-gray text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank" })
      .run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-b-0 border-gray-300 rounded-t-lg bg-gray-50">
      <SEO title={editor ? "Edit Post" : "Create Post"} noIndex={true} />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        title="Bold"
      >
        <BoldIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        title="Italic"
      >
        <ItalicIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
        title="Underline"
      >
        <UnderlineIcon />
      </button>
      <button
        type="button"
        onClick={setLink}
        className={buttonClass(editor.isActive("link"))}
        title="Add Link"
      >
        <LinkIcon />
      </button>
      <div className="w-px h-6 bg-gray-300"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <H2Icon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 3 }))}
        title="Heading 3"
      >
        <H3Icon />
      </button>
      <div className="w-px h-6 bg-gray-300"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <ListIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        title="Blockquote"
      >
        <QuoteIcon />
      </button>
    </div>
  );
};

interface BlogFormData {
  title: string;
  excerpt: string;
  authorName: string;
  authorLinkedin: string;
  content: string;
  image: FileList;
}

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML(), { shouldValidate: true });
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none p-4 border border-gray-300 rounded-b-lg min-h-[400px] focus:outline-none focus:ring-2 focus:ring-brand-sky-blue",
      },
    },
  });

  useEffect(() => {
    if (isEditing && editor) {
      const fetchBlog = async () => {
        try {
          const { data } = await api.get(`/api/blogs/${id}`);
          setValue("title", data.title);
          setValue("excerpt", data.excerpt);
          setValue("authorName", data.authorName);
          setValue("authorLinkedin", data.authorLinkedin);
          editor.commands.setContent(data.content);
        } catch (error) {
          toast.error("Failed to load blog post.");
        }
      };
      fetchBlog();
    }
  }, [id, isEditing, setValue, editor]);

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("authorName", data.authorName);
    formData.append("authorLinkedin", data.authorLinkedin);
    formData.append("content", data.content);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const toastId = toast.loading(
      isEditing ? "Updating post..." : "Creating post..."
    );
    try {
      if (isEditing) {
        await api.put(`/api/blogs/${id}`, formData);
      } else {
        await api.post("/api/blogs", formData);
      }
      toast.success(`Post ${isEditing ? "updated" : "created"} successfully!`, {
        id: toastId,
      });
      navigate("/admin/blogs");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed.", {
        id: toastId,
      });
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-brand-sky-blue";

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <h1 className="font-display text-3xl font-bold mb-8">
        {isEditing ? "Edit" : "Create"} Post
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-medium text-gray-700">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={inputStyles}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="font-medium text-gray-700">
            Excerpt (A short summary for the blog page)
          </label>
          <textarea
            rows={3}
            {...register("excerpt", { required: "Excerpt is required" })}
            className={inputStyles}
          />
          {errors.excerpt && (
            <p className="text-red-500 text-xs mt-1">
              {errors.excerpt.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Author Name</label>
            <input
              {...register("authorName", {
                required: "Author name is required",
              })}
              className={inputStyles}
            />
            {errors.authorName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.authorName.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium text-gray-700">
              Author's LinkedIn URL (Optional)
            </label>
            <input {...register("authorLinkedin")} className={inputStyles} />
          </div>
        </div>
        <div>
          <label className="font-medium text-gray-700">Feature Image</label>
          <input
            type="file"
            {...register("image", { required: !isEditing })}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-sky-blue/10 file:text-brand-sky-blue hover:file:bg-brand-sky-blue/20"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
        </div>
        <div>
          <label className="font-medium text-gray-700">Content</label>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          <input
            type="hidden"
            {...register("content", {
              required: "Content cannot be empty.",
              minLength: { value: 15, message: "Content is too short." },
            })}
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
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
              ? "Update Post"
              : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
