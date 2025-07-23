import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const toastId = toast.loading("Sending your message...");
    try {
      await api.post("/api/messages", data);
      toast.success(
        "Message sent successfully! We will get back to you soon.",
        { id: toastId }
      );
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.", { id: toastId });
    }
  };

  const inputStyles =
    "mt-1 block w-full border min-h-[45px] rounded-md border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-brand-sky-blue";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
      <h2 className="font-display text-3xl font-bold text-brand-dark-gray">
        Send Us a Message
      </h2>
      <p className="mt-2 text-gray-600">
        Have a question or want to collaborate? Drop us a line!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Your name is required" })}
            className={inputStyles}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "A valid email is required" })}
            className={inputStyles}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message", { required: "Please enter your message" })}
            className={inputStyles}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-sky-blue text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
