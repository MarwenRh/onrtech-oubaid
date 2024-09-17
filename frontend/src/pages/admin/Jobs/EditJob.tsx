import { useNavigate, useParams } from "react-router-dom";
import ValidationError from "../../../components/reusableComponents/ValidationError";

import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import { useEffect, useState } from "react";

import { JobOffer } from "../../../types/types";
import axios from "axios";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

function getEditorStyle(fieldError: FieldError | undefined) {
  return fieldError ? "border-red-500" : "";
}
const EditJob = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");
  const { user } = useSelector((state: RootState) => state.auth);
  {
    const [currentJob, setCurrentJob] = useState<JobOffer | null>(null);
    const { id } = useParams();

    useEffect(() => {
      const getJobDetails = async () => {
        try {
          const resp = await axios.get(`${BACKEND_URL}/jobs/getJob/${id}`);
          setCurrentJob(resp.data);
        } catch (error) {
          console.log(error);
          alert("An error occurred. Please check the console.");
        }
      };
      getJobDetails();
    }, [id]);

    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<JobOffer>({ mode: "onBlur", reValidateMode: "onBlur" });

    const onSubmit = async (data: JobOffer) => {
      console.log("submitted data", data);

      try {
        await axios.put(`${BACKEND_URL}/jobs/updateJob/${id}`, data);
        toast.success(
          "Success! The job details have been updated successfully."
        );
        if (user?.role === "Admin") navigate("/ManageJobs");
        else {
          navigate("/editorJobs");
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Uh-oh! We ran into an issue while trying to update the job details."
        );
      }
    };

    const contractTypeOptions = [
      "Full Time",
      "Part Time",
      "Contract Work",
      "Freelancing",
      "Internship",
    ];
    const locationTypeOptions = ["On-Site", "Remote", "Hyprid"];
    const locationPlaceOptions = ["France", "Remote"];
    const incomeCurrencyOptions = ["USD", "EUR", "GBP"];
    const incomePeriodOptions = [
      "Monthly",
      "Weekly",
      "Bi-weekly (Fortnightly)",
      "Quarterly",
      "Annually",
      "Custom Period",
      "Per Pay Period",
      "Daily",
      "Per Project/Job",
      "Other (Specify)",
    ];
    const contractDurationOptions = [
      "1 Month",
      "3 Months",
      "6 Months",
      "1 Year",
      "2 Years",
      "3 Years",
      "Indefinite",
      "Custom Duration",
      "Per Project/Job",
      "Other (Specify)",
    ];

    return (
      <div className="dark:bg-slate-900 pt-10">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-gray-200 rounded-lg shadow-md w-10/12 mx-auto dark:bg-slate-400 "
        >
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Edit the current job offer
          </h2>
          {currentJob ? (
            <>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 dark:text-gray-100 text-lg"
                >
                  Title
                </label>
                <input
                  defaultValue={currentJob.title}
                  {...register("title", {
                    required: "You must enter a title",
                  })}
                  className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                    errors.title
                  )}`}
                />
                <ValidationError fieldError={errors.title} />
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-3/5">
                  <label
                    htmlFor="targetProfile"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Target Profile
                  </label>
                  <input
                    defaultValue={currentJob.targetProfile}
                    {...register("targetProfile", {
                      required: "You must enter the target profile ge",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.targetProfile
                    )}`}
                  />
                  <ValidationError fieldError={errors.targetProfile} />
                </div>
                <div className="w-1/4">
                  <label
                    htmlFor="contractType"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Contract Type
                  </label>
                  <select
                    defaultValue={currentJob.contractType}
                    {...register("contractType", {
                      required: "You must enter contract type",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.contractType
                    )}`}
                  >
                    {contractTypeOptions.map((contract) => (
                      <option key={contract} value={contract}>
                        {contract}
                      </option>
                    ))}
                  </select>
                  <ValidationError fieldError={errors.contractType} />
                </div>
              </div>
              {/* Rest of the fields */}
              <div className="flex-col flex sm:flex-row justify-evenly md:justify-between items-center">
                <div className="lg:w-1/4">
                  <label
                    htmlFor="contractDuration"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Contract Duration
                  </label>
                  <select
                    defaultValue={currentJob.contractDuration}
                    id="contractDuration"
                    {...register("contractDuration", {
                      required: "You must enter contract duration",
                    })}
                    className="w-full p-2 mb-4 border rounded"
                  >
                    {contractDurationOptions.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lg:w-1/4">
                  <label
                    htmlFor="locationType"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Location Type
                  </label>
                  <select
                    defaultValue={currentJob.locationType}
                    id="locationType"
                    {...register("locationType", {
                      required: "You must enter location type",
                    })}
                    className="w-full p-2 mb-4 border rounded"
                  >
                    {locationTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lg:w-1/4">
                  <label
                    htmlFor="locationPlace"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Location Place
                  </label>
                  <select
                    defaultValue={currentJob.locationPlace}
                    id="locationPlace"
                    {...register("locationPlace", {
                      required: "You must enter location place",
                    })}
                    className="w-full p-2 mb-4 border rounded"
                  >
                    {locationPlaceOptions.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Contract duration -Income value -Income Period */}
              <div className="flex-col flex sm:flex-row justify-evenly md:justify-between items-center ">
                <div className="lg:w-1/4">
                  <label
                    htmlFor="incomePeriod"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Income Period
                  </label>
                  <select
                    defaultValue={currentJob.incomePeriod}
                    id="incomePeriod"
                    {...register("incomePeriod", {
                      required: "You must enter income period",
                    })}
                    className="w-full p-2 mb-4 border rounded"
                  >
                    {incomePeriodOptions.map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:w-1/4">
                  <label
                    htmlFor="incomeValue"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Income Value
                  </label>
                  <input
                    defaultValue={currentJob.incomeValue}
                    placeholder="Income value"
                    type="number"
                    id="incomeValue"
                    {...register("incomeValue", {
                      required: "You must enter income value",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.incomeValue
                    )}`}
                  />
                  <ValidationError fieldError={errors.incomeValue} />
                </div>

                <div className="lg:w-1/4">
                  <label
                    htmlFor="incomeCurrency"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Income Currency
                  </label>
                  <select
                    defaultValue={currentJob.incomeCurrency}
                    id="incomeCurrency"
                    {...register("incomeCurrency", {
                      required: "You must enter income currency",
                    })}
                    className="w-full p-2 mb-4 border rounded"
                  >
                    {incomeCurrencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* all qualification */}
              <div className="flex flex-row justify-between">
                {/* Required Qualification */}
                <div className="w-2/5">
                  <label
                    htmlFor="requiredQualification"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Required Qualifications
                  </label>
                  <input
                    defaultValue={currentJob.requiredQualification}
                    placeholder="Required Qualification"
                    id="requiredQualification"
                    {...register("requiredQualification", {
                      required: "You must enter the required qualification",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.requiredQualification
                    )}`}
                  />
                  <ValidationError fieldError={errors.requiredQualification} />
                </div>
                {/* optional Qualification */}
                <div className="w-2/5">
                  <label
                    htmlFor="optionalQualification"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Optional Qualifications
                  </label>
                  <input
                    defaultValue={currentJob.optionalQualification}
                    placeholder="optional Qualification"
                    id="optionalQualification"
                    {...register("optionalQualification", {
                      required: "You must enter the optional qulification",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.optionalQualification
                    )}`}
                  />
                  <ValidationError fieldError={errors.optionalQualification} />
                </div>
              </div>
              {/* required years */}
              <div className="flex flex-row justify-between">
                {/* Required year */}
                <div className="w-2/5">
                  <label
                    htmlFor="yearsOfExperienceRequired"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Years of Experience Required
                  </label>
                  <input
                    defaultValue={currentJob.yearsOfExperienceRequired}
                    placeholder="Required years"
                    type="number"
                    id="yearsOfExperienceRequired"
                    {...register("yearsOfExperienceRequired", {
                      required:
                        "You must enter the requried years of expreience",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.yearsOfExperienceRequired
                    )}`}
                  />
                  <ValidationError
                    fieldError={errors.yearsOfExperienceRequired}
                  />
                </div>
                {/* Recomanded years */}
                <div className="w-2/5">
                  <label
                    htmlFor="yearsOfExperienceRecommanded"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Years of Experience Recommended
                  </label>
                  <input
                    defaultValue={currentJob.yearsOfExperienceRecommanded}
                    placeholder="Recommended years"
                    type="number"
                    id="yearsOfExperienceRecommanded"
                    {...register("yearsOfExperienceRecommanded", {
                      required:
                        "You must enter the required years of experience",
                    })}
                    className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                      errors.yearsOfExperienceRecommanded
                    )}`}
                  />
                  <ValidationError
                    fieldError={errors.yearsOfExperienceRecommanded}
                  />
                </div>
              </div>
              {/* Benefits */}
              <div>
                <label
                  htmlFor="benefits"
                  className="block mb-2 dark:text-gray-100 text-lg"
                >
                  Benefits
                </label>
                <input
                  defaultValue={currentJob.benefits}
                  placeholder="Enter job benefits"
                  id="benefits"
                  {...register("benefits", {
                    required: "You must enter job benefits",
                  })}
                  className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                    errors.benefits
                  )}`}
                />
                <ValidationError fieldError={errors.benefits} />
              </div>
              {/* Description */}
              <label
                htmlFor="description"
                className="block mb-2 dark:text-gray-100 text-lg"
              >
                Description
              </label>
              <textarea
                defaultValue={currentJob.description}
                placeholder="Enter job description..."
                rows={12}
                id="description"
                {...register("description", {
                  required: "You must enter job description",
                })}
                className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                  errors.description
                )}`}
              />
              <ValidationError fieldError={errors.description} />
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit Job
                </button>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    );
  }
};
export default EditJob;
