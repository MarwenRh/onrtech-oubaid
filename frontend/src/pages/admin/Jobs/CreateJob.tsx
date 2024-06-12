import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import ValidationError from "../../../components/reusableComponents/ValidationError";

import axios from "axios";
import { JobOffer } from "../../../types/types";
import { useForm, FieldError } from "react-hook-form";

import { toast } from "react-toastify";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

function getEditorStyle(fieldError: FieldError | undefined) {
  return fieldError ? "border-red-500" : "";
}

const CreateJob = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const name = user?.name;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobOffer>({ mode: "onBlur", reValidateMode: "onBlur" });
  const PostData = async (jobOffer: JobOffer) => {
    try {
      await axios.post("http://localhost:5000/api/jobs/PostJob", jobOffer);
      toast.success("New job offer created successfully !");
    } catch (error) {
      console.log(error);
      console.log(error);
      toast.error(
        "Oops! We encountered a hiccup while creating the new job offer."
      );
    }
  };

  const onSubmit = (data: JobOffer) => {
    if (user?.role === "Admin") {
      data.published = true;
      data.publishedAt = new Date();
    } else {
      data.published = false;
    }
    data.userId = user?._id;
    data.author = name;
    console.log(data.userId);

    PostData(data);
    if (user?.role === "Admin") {
      navigate("/ManageJobs");
    } else {
      navigate("/editorJobs");
    }
  };
  const contractTypeOptions = [
    "Full Time",
    "Part Time",
    "Contract Work",
    "Freelancing",
    "Internship",
  ];
  const locationTypeOptions = ["On-Site", "Remote", "Hybrid"];
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
        className="p-6 bg-gray-200 rounded-lg shadow-md w-10/12 mx-auto dark:bg-slate-400"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a new job offer</h2>
        <div>
          <label htmlFor="title" className="block mb-2 text-lg">
            Title
          </label>
          <input
            placeholder="Job title"
            id="title"
            {...register("title", { required: "You must enter a title" })}
            className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
              errors.title
            )}`}
          />
          <ValidationError fieldError={errors.title} />
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-3/5">
            <label htmlFor="targetProfile" className="block mb-2 text-lg">
              Target Profile
            </label>
            <input
              {...register("targetProfile", {
                required: "You must enter the target profile",
              })}
              className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                errors.title
              )}`}
              placeholder="target profile"
              id="targetProfile"
            />
            <ValidationError fieldError={errors.targetProfile} />
          </div>

          <div className=" w-1/4">
            <label htmlFor="contractType" className="block mb-2 text-lg">
              Contract Type
            </label>
            <select
              id="contractType"
              {...register("contractType", {
                required: "You must enter contract type ",
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
        <div className="flex-col flex sm:flex-row justify-evenly md:justify-between items-center">
          <div className="lg:w-1/4">
            <label htmlFor="contractDuration" className="block mb-2 text-lg">
              Contract Duration
            </label>
            <select
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
            <label htmlFor="locationType" className="block mb-2 text-lg">
              Location Type
            </label>
            <select
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
            <label htmlFor="locationPlace" className="block mb-2 text-lg">
              Location Place
            </label>
            <select
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
            <label htmlFor="incomePeriod" className="block mb-2 text-lg">
              Income Period
            </label>
            <select
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
            <label htmlFor="incomeValue" className="block mb-2 text-lg">
              Income Value
            </label>
            <input
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
            <label htmlFor="incomeCurrency" className="block mb-2 text-lg">
              Income Currency
            </label>
            <select
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
              className="block mb-2 text-lg"
            >
              Required Qualifications
            </label>
            <input
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
              className="block mb-2 text-lg"
            >
              Optional Qualifications
            </label>
            <input
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
              className="block mb-2 text-lg"
            >
              Years of Experience Required
            </label>
            <input
              placeholder="Required years"
              type="number"
              id="yearsOfExperienceRequired"
              {...register("yearsOfExperienceRequired", {
                required: "You must enter the requried years of expreience",
              })}
              className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                errors.yearsOfExperienceRequired
              )}`}
            />
            <ValidationError fieldError={errors.yearsOfExperienceRequired} />
          </div>
          {/* Recomanded years */}
          <div className="w-2/5">
            <label
              htmlFor="yearsOfExperienceRecommanded"
              className="block mb-2 text-lg"
            >
              Years of Experience Recommended
            </label>
            <input
              placeholder="Recommended years"
              type="number"
              id="yearsOfExperienceRecommanded"
              {...register("yearsOfExperienceRecommanded", {
                required: "You must enter the required years of experience",
              })}
              className={`w-full p-2 mb-4 border rounded ${getEditorStyle(
                errors.yearsOfExperienceRecommanded
              )}`}
            />
            <ValidationError fieldError={errors.yearsOfExperienceRecommanded} />
          </div>
        </div>
        {/* Benefits */}
        <div>
          <label htmlFor="benefits" className="block mb-2 text-lg">
            Benefits
          </label>
          <input
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
        <label htmlFor="description" className="block mb-2 text-lg">
          Description
        </label>
        <textarea
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
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
