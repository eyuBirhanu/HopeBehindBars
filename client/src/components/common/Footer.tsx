import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "./Logo";

interface NewsletterFormData {
  email: string;
}

const TwitterIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.5 19.5h1.5l-8.25-10.875h-1.75L17.5 19.5z" />
  </svg>
);

export const LinkedInIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>();

  const onSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
    const loadingToast = toast.loading("Subscribing...");
    try {
      await axios.post("/api/subscribe", data);
      toast.success("Thank you for subscribing!", { id: loadingToast });
      reset();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message, { id: loadingToast });
      } else {
        toast.error("Subscription failed. Please try again.", {
          id: loadingToast,
        });
      }
    }
  };
  return (
    <footer className="bg-neutral-light border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-6 lg:col-span-4">
            <Link to="/">
              <Logo className="h-12 w-auto" />
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              Great futures are built with compassion and a second chance.
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-brand-dark-gray tracking-wider">
              About Us
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about#story"
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/impact"
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  to="/about#team"
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-brand-dark-gray tracking-wider">
              Get Involved
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <button
                  onClick={() => {
                    /* Logic to open donation modal */
                  }}
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Donate
                </button>
              </li>
              <li>
                <Link
                  to="/join-team"
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-brand-sky-blue transition"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="font-semibold text-brand-dark-gray tracking-wider">
              Ready to create change?
            </h4>
            <p className="mt-4 text-gray-600">
              Join our newsletter to get the latest news, stories, and updates
              directly in your inbox.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 flex flex-col sm:flex-row gap-2"
            >
              <div className="w-full">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="footer-email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-2.5 text-base text-brand-dark-gray bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sky-blue ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-shrink-0 bg-brand-dark-gray text-white font-bold py-2.5 px-5 rounded-lg transition-colors hover:bg-black disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hope Behind Bars. All Rights Reserved.
          </p>
          <div className="flex space-x-5">
            <a
              href="#"
              className="text-gray-500 hover:text-brand-dark-gray transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-brand-dark-gray transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-brand-dark-gray transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
