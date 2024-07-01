import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { JobOffer } from "../../../types/types";
import { Loader } from "../../../components/loader/Loader";

import { toast } from "react-toastify";
import { CgSandClock } from "react-icons/cg";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const ApplyForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<JobOffer | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [disable, setDiable] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getSingleJob = async (id: string) => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/jobs/getJob/${id}`
        );
        setJob(resp.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    if (id) getSingleJob(id);
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const inputedFile = e.target.files[0];
      // Check if the file is a PDF
      if (inputedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setFile(inputedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload your Resume.");
      return;
    }

    const formData = new FormData();
    if (job) {
      formData.append("offerId", job?._id);
      formData.append("applicantId", user?._id);
      formData.append("cv", file);
      formData.append("applicantName", user?.name);
      formData.append("applicantEmail", user?.email);
      formData.append("offerTitle", job?.title);
    }

    try {
      setDiable(true);
      await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDiable(false);
      console.log("File uploaded successfully:");
      console.log(formData.get("name"));
      console.log(formData.get("email"));
      console.log(formData.get("cv"));
      toast.success(
        "Application submitted successfully. You will receive an mail with acceptance or rejection within a week!",
        {
          autoClose: 10000,
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.success("Failed to submit application.");
    }
  };

  return (
    <div className="pt-6 flex items-center justify-center dark:bg-slate-900 dark:text-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-2 w-10/12 ">
          <div className="dark:bg-slate-900 pt-10">
            <form className="p-6 bg-gray-200 rounded-lg shadow-md w-10/12 mx-auto dark:bg-slate-400">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Edit the current job offer
              </h2>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 dark:text-gray-100 text-lg"
                >
                  Title
                </label>
                <input
                  readOnly
                  className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                  value={job?.title}
                />
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
                    readOnly
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.targetProfile}
                  />
                </div>
                <div className="w-1/4">
                  <label
                    htmlFor="contractType"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Contract Type
                  </label>
                  <input
                    readOnly
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.contractType}
                  />
                </div>
              </div>
              <div className="flex-col flex sm:flex-row justify-evenly md:justify-between items-center">
                <div className="lg:w-1/4">
                  <label
                    htmlFor="contractDuration"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Contract Duration
                  </label>
                  <input
                    readOnly
                    id="contractDuration"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.contractDuration}
                  />
                </div>
                <div className="lg:w-1/4">
                  <label
                    htmlFor="locationType"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Location Type
                  </label>
                  <input
                    readOnly
                    id="locationType"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.locationType}
                  />
                </div>
                <div className="lg:w-1/4">
                  <label
                    htmlFor="locationPlace"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Location Place
                  </label>
                  <input
                    readOnly
                    id="locationPlace"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.locationPlace}
                  />
                </div>
              </div>
              <div className="flex-col flex sm:flex-row justify-evenly md:justify-between items-center ">
                <div className="lg:w-1/4">
                  <label
                    htmlFor="incomePeriod"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Income Period
                  </label>
                  <input
                    readOnly
                    id="incomePeriod"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.incomePeriod}
                  />
                </div>
                <div className="lg:w-1/4">
                  <label
                    htmlFor="incomeValue"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Income Value
                  </label>
                  <input
                    readOnly
                    type="number"
                    id="incomeValue"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.incomeValue}
                  />
                </div>
                <div className="lg:w-1/4">
                  <label
                    htmlFor="incomeValue"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Income Currency
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="incomeValue"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.incomeCurrency}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-2/5">
                  <label
                    htmlFor="requiredQualification"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Required Qualifications
                  </label>
                  <input
                    readOnly
                    id="requiredQualification"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.requiredQualification}
                  />
                </div>
                <div className="w-2/5">
                  <label
                    htmlFor="optionalQualification"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Optional Qualifications
                  </label>
                  <input
                    readOnly
                    id="optionalQualification"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.optionalQualification}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-2/5">
                  <label
                    htmlFor="yearsOfExperienceRequired"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Years of Experience Required
                  </label>
                  <input
                    readOnly
                    type="number"
                    id="yearsOfExperienceRequired"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.yearsOfExperienceRequired}
                  />
                </div>
                <div className="w-2/5">
                  <label
                    htmlFor="yearsOfExperienceRecommanded"
                    className="block mb-2 dark:text-gray-100 text-lg"
                  >
                    Years of Experience Recommended
                  </label>
                  <input
                    readOnly
                    type="number"
                    id="yearsOfExperienceRecommanded"
                    className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                    value={job?.yearsOfExperienceRecommanded}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="benefits"
                  className="block mb-2 dark:text-gray-100 text-lg"
                >
                  Benefits
                </label>
                <input
                  readOnly
                  id="benefits"
                  className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                  value={job?.benefits}
                />
              </div>
              <label
                htmlFor="description"
                className="block mb-2 dark:text-gray-100 text-lg"
              >
                Description
              </label>
              <textarea
                readOnly
                rows={12}
                id="description"
                className="w-full p-2 mb-4 border rounded dark:text-gray-700"
                value={job?.description}
              />
            </form>
          </div>

          {user ? (
            user.role === "Admin" || user.role === "Web Editor" ? (
              <div>
                <div className="text-lg font-bold text-red-500">
                  As an administrator, you cannot apply
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="cv"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                  >
                    Upload CV
                  </label>
                  <input
                    type="file"
                    id="cv"
                    onChange={handleFileChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-600"
                  />
                </div>
                <div>
                  <button
                    disabled={disable}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {disable ? (
                      <CgSandClock size={30} className="text-gray-300" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div>
              <div className="text-lg font-bold text-red-500">
                You have to register to apply
              </div>
              <div className="text-lg underline text-blue-500 decoration-blue-300">
                <Link to={"/login"}>Register Now</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplyForm;
