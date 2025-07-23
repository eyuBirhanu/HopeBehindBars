import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";
import api from "../services/api";

// --- Form Data Type ---
interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  interest: string;
  skillSet?: string;
  otherInterestDetail?: string;
  motivation: string;
  availability: string;
  linkedin?: string;
  twitter?: string;
  additionalComments?: string;
}

// --- Helper Component for Form Inputs ---
interface FormInputProps {
  label: string;
  name: keyof VolunteerFormData;
  register: any;
  errors: any;
  validationRules?: object;
  type?: string;
  placeholder?: string;
  isOptional?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  errors,
  validationRules = {},
  type = "text",
  placeholder = "",
  isOptional = false,
  className = "",
}) => (
  <div className={className}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {!isOptional && <span className="text-brand-rose">*</span>}
      {isOptional && <span className="text-xs text-gray-400"> (Optional)</span>}
    </label>
    <input
      type={type}
      id={name}
      placeholder={placeholder}
      {...register(name, validationRules)}
      className={`mt-1 block w-full rounded-lg border-[.2px] border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue transition-colors px-4 py-2.5 ${
        errors[name]
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : ""
      }`}
    />
    {errors[name] && (
      <p className="mt-1 text-xs text-red-600">
        {errors[name]?.message as string}
      </p>
    )}
  </div>
);

// --- Main Page Component ---
const JoinTeamPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>();

  const interestValue = watch("interest");

  const onSubmit: SubmitHandler<VolunteerFormData> = async (data) => {
    const loadingToast = toast.loading("Submitting your application...");
    try {
      await api.post("/api/volunteer", data);
      toast.dismiss(loadingToast);
      toast.success(
        "Application submitted successfully! We will be in touch soon."
      );
      setIsSubmitted(true);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Submission failed. Please try again.");
      console.error(error);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-brand-dark-gray">
            Thank You!
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We've received your application. Our team will review it and get
            back to you as soon as possible. Your willingness to help makes all
            the difference.
          </p>
        </div>
      </section>
    );
  }

  const baseInputClasses =
    "appearance-none mt-1 block w-full rounded-lg border-[.2px] border-gray-300 shadow-sm focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue transition-colors px-4 py-2.5";
  const errorInputClasses =
    "border-red-500 focus:border-red-500 focus:ring-red-500";
  const selectArrowStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: "right 0.75rem center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "1.5em 1.5em",
  };

  return (
    <section className="bg-neutral-light py-20 md:py-28">
      <SEO
        title="Join Our Team"
        description="Volunteer with Hope Behind Bars and use your skills to make a real difference. Explore opportunities in teaching, event support, fundraising, and more."
        url="/join-team"
      />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark-gray">
            Join Our Team
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Become a part of a passionate team dedicated to creating change.
            Your skills, time, and passion can make a profound difference.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              name="fullName"
              register={register}
              errors={errors}
              validationRules={{ required: "Full name is required" }}
              placeholder="Jane Doe"
            />
            <FormInput
              label="Email Address"
              name="email"
              register={register}
              errors={errors}
              type="email"
              validationRules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              placeholder="jane.doe@example.com"
            />
            <FormInput
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              type="tel"
              validationRules={{ required: "Phone number is required" }}
              placeholder="+1 (555) 123-4567"
            />
            <FormInput
              label="Age"
              name="age"
              register={register}
              errors={errors}
              type="number"
              validationRules={{
                required: "Age is required",
                min: { value: 18, message: "You must be at least 18" },
              }}
              placeholder="18"
            />
          </div>

          <div>
            <label
              htmlFor="interest"
              className="block text-sm font-medium text-gray-700"
            >
              Area of Interest <span className="text-brand-rose">*</span>
            </label>
            <select
              id="interest"
              {...register("interest", {
                required: "Please select an area of interest",
              })}
              className={`${baseInputClasses} ${
                errors.interest ? errorInputClasses : ""
              }`}
              style={selectArrowStyle}
            >
              <option value="">Select how you'd like to help...</option>
              <option value="Skills-Based Volunteering">
                Skills-Based Volunteering
              </option>
              <option value="Event Support">Event Support</option>
              <option value="Fundraising & Partnerships">
                Fundraising & Partnerships
              </option>
              <option value="General Support">General Support</option>
              <option value="Other">Other</option>
            </select>
            {errors.interest && (
              <p className="mt-1 text-xs text-red-600">
                {errors.interest?.message as string}
              </p>
            )}
          </div>

          {interestValue === "Skills-Based Volunteering" && (
            <FormInput
              label="What is your area of expertise?"
              name="skillSet"
              register={register}
              errors={errors}
              validationRules={{ required: "Please specify your skills" }}
              placeholder="e.g., Business management, Photography..."
            />
          )}

          {interestValue === "Other" && (
            <FormInput
              label="Please specify your interest"
              name="otherInterestDetail"
              register={register}
              errors={errors}
              validationRules={{
                required: "Please specify your other interest",
              }}
              placeholder="Tell us more..."
            />
          )}

          <div>
            <label
              htmlFor="motivation"
              className="block text-sm font-medium text-gray-700"
            >
              Why do you want to join us?{" "}
              <span className="text-brand-rose">*</span>
            </label>
            <textarea
              id="motivation"
              rows={4}
              {...register("motivation", {
                required: "This field is required",
              })}
              placeholder="Briefly tell us what motivates you to be a part of our mission."
              className={`${baseInputClasses} ${
                errors.motivation ? errorInputClasses : ""
              }`}
            />
            {errors.motivation && (
              <p className="mt-1 text-xs text-red-600">
                {errors.motivation?.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700"
            >
              Your Availability <span className="text-brand-rose">*</span>
            </label>
            <select
              id="availability"
              {...register("availability", {
                required: "Please select your availability",
              })}
              className={`${baseInputClasses} ${
                errors.availability ? errorInputClasses : ""
              }`}
              style={selectArrowStyle}
            >
              <option value="">Select your general availability...</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Flexible">Flexible</option>
            </select>
            {errors.availability && (
              <p className="mt-1 text-xs text-red-600">
                {errors.availability?.message as string}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="LinkedIn Profile"
              name="linkedin"
              register={register}
              errors={errors}
              isOptional={true}
            />
            <FormInput
              label="Twitter / X Profile"
              name="twitter"
              register={register}
              errors={errors}
              isOptional={true}
            />
          </div>

          <div>
            <label
              htmlFor="additionalComments"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Comments{" "}
              <span className="text-xs text-gray-400">(Optional)</span>
            </label>
            <textarea
              id="additionalComments"
              rows={3}
              {...register("additionalComments")}
              placeholder="Anything else you'd like to share?"
              className={baseInputClasses}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-brand-sky-blue hover:bg-brand-sky-blue/90 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JoinTeamPage;
