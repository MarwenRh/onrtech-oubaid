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
    <div className="flex flex-col py-4 p-2 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold underline mb-3 dark:text-gray-200">
        {t("contact_us_title")}
      </h2>
      <p className="mb-3 dark:text-gray-900 text-lg">{t("instructions")}</p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">{t("name_label")}</label>
          <input
            className={`${fieldStyle} ${getEditorStyle(errors.name)}`}
            type="text"
            id="name"
            {...register("name", { required: t("name_required") })}
          />
          <ValidationError fieldError={errors.name} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">{t("email_label")}</label>
          <input
            className={`${fieldStyle} ${getEditorStyle(errors.email)}`}
            type="email"
            id="email"
            {...register("email", {
              required: t("email_required"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("email_pattern"),
              },
            })}
          />
          <ValidationError fieldError={errors.email} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="reason">{t("reason_label")}</label>
          <select
            className={`${fieldStyle} ${getEditorStyle(errors.reason)}`}
            id="reason"
            {...register("reason", {
              required: t("reason_required"),
            })}
          >
            <option value=""></option>
            <option value="Support">{t("support")}</option>
            <option value="Feedback">{t("feedback")}</option>
            <option value="Other">{t("other")}</option>
          </select>
          <ValidationError fieldError={errors.reason} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">{t("additional_notes_label")}</label>
          <textarea
            className={`${fieldStyle} ${getEditorStyle(errors.notes)}`}
            id="notes"
            {...register("notes", { required: t("notes_required") })}
          />
          <ValidationError fieldError={errors.notes} />
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 h-10 px-6 font-semibold bg-black text-white"
          >
            {t("submit_button")}
          </button>
        </div>
      </form>
    </div>
  );
}
