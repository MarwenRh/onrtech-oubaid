import { useForm, FieldError } from "react-hook-form";

import ValidationError from "../../../components/reusableComponents/ValidationError";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

export function ContactPage() {
  const { t } = useTranslation();
  const fieldStyle = "flex flex-col mb-2 p-1.5 dark:text-gray-700 text-lg";

  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? "border-red-500" : "";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({ mode: "onBlur", reValidateMode: "onBlur" });

  const onSubmit = async (contact: Contact) => {
    console.log("Submitted details:", contact);
    try {
      await axios.post(`${BACKEND_URL}/forms`, contact);
      toast.success("Your feedback have been submitted with success");
    } catch (error) {
      toast.error("we had a problem please try again");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("name_label")} *
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: t("name_required") })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-gray-600 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
            />
            <ValidationError fieldError={errors.name} />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("email_label")} *
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: t("email_required"),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t("email_pattern"),
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-gray-600 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your.email@example.com"
            />
            <ValidationError fieldError={errors.email} />
          </div>
        </div>

        {/* Reason Field */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("reason_label")} *
          </label>
          <select
            id="reason"
            {...register("reason", {
              required: t("reason_required"),
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-gray-600 ${
              errors.reason ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a reason</option>
            <option value="Support">{t("support")}</option>
            <option value="Feedback">{t("feedback")}</option>
            <option value="Partnership">Partnership Inquiry</option>
            <option value="Career">Career Opportunity</option>
            <option value="Other">{t("other")}</option>
          </select>
          <ValidationError fieldError={errors.reason} />
        </div>

        {/* Notes Field */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("additional_notes_label")} *
          </label>
          <textarea
            id="notes"
            rows={5}
            {...register("notes", { required: t("notes_required") })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white dark:border-gray-600 resize-none ${
              errors.notes ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tell us more about your inquiry..."
          />
          <ValidationError fieldError={errors.notes} />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {t("submit_button")}
          </button>
        </div>
      </form>
    </div>
  );
}
