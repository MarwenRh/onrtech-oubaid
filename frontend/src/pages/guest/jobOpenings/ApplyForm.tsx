import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { JobOffer } from "../../../types/types";
import { Loader } from "../../../components/loader/Loader";
import { formatDate } from "../../../utils/fomatDate";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { CgSandClock } from "react-icons/cg";
import { RootState } from "../../../redux/store";

const ApplyForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<JobOffer | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [disable, setDiable] = useState(false);

  const { id } = useParams();

  // Assume we have user info from context or props
  // const user = {
  //   name: "John Doe", // Replace with actual user name
  //   email: "john.doe@example.com", // Replace with actual user email
  // };

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
      const selectedFile = e.target.files[0];
      // Check if the file is a PDF
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
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
          <div>
            <h2 className="pt-6  text-3xl font-extrabold text-gray-900 dark:text-blue-50">
              {job?.title}
            </h2>
            <h2 className="pt-3 text-2xl text-blue-400 font-semibold">
              Onrtech
            </h2>
          </div>
          <div className="pt-2">
            <h2 className="font-semibold text-xl dark:text-blue-100 ">
              Location
            </h2>
            <div className=" flex-col flex md:flex-row text-lg ">
              <div className="flex flex-row justify-evenly  items-center pr-8">
                <h2 className="pr-3 font-medium text-sky-500 ">
                  Location Type :{" "}
                </h2>
                <p>{job?.locationType}</p>
              </div>
              <div className="flex flex-row justify-evenly items-center pr-8 ">
                <h2 className="pr-3 font-medium  text-sky-500">
                  Location Place :{" "}
                </h2>
                <div>{job?.locationPlace}</div>
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-semibold text-xl dark:text-blue-100  ">
              Published at :
            </p>{" "}
            {job && formatDate(job?.publishedAt)}
          </div>
          <div className="pt-2">
            <h2 className="font-semibold text-xl dark:text-blue-100  ">
              Contract
            </h2>
            <div className="flex-col flex md:flex-row text-lg ">
              <div className="flex flex-row justify-evenly  items-center pr-8">
                <h2 className="pr-3 font-medium text-sky-500">
                  Contract Type :{" "}
                </h2>
                <p>{job?.contractType}</p>
              </div>
              <div className="flex flex-row justify-evenly items-center pr-8 ">
                <h2 className="pr-3 font-medium  text-sky-500">
                  Contract Duration :{" "}
                </h2>
                <div>{job?.contractDuration}</div>
              </div>
            </div>
          </div>
          {/* Income */}
          <div className="pt-2">
            <h2 className="font-semibold text-xl  dark:text-blue-100 ">
              Income
            </h2>
            <div className="flex-col flex md:flex-row text-lg ">
              <div className="flex flex-row justify-evenly  items-center pr-8">
                <h2 className="pr-3 font-medium  text-sky-500">
                  Income Period :{" "}
                </h2>
                <p>{job?.incomePeriod}</p>
              </div>
              <div className="flex flex-row justify-evenly items-center pr-8 ">
                <h2 className="pr-3 font-medium text-sky-500">
                  Income Value :{" "}
                </h2>
                <div>{job?.incomeValue}</div>
              </div>
              <div className="flex flex-row justify-evenly items-center pr-8 ">
                <h2 className="pr-3 font-medium text-sky-500">
                  Income Currency :{" "}
                </h2>
                <div>{job?.incomeCurrency}</div>
              </div>
            </div>
          </div>
          {/* Required  Qualification */}
          <div className="pt-2">
            <h2 className="font-semibold text-xl  dark:text-blue-100 ">
              Essential Qualifications
            </h2>
            <div className="flex-col flex text-lg  ">
              <div className="flex flex-col lg:flex-row justify-between  items-center p-4 ">
                <div className="pr-8 w-full  lg:w-3/12 font-medium text-sky-500">
                  Job Qualifcation :
                </div>
                <p>{job?.requiredQualification}</p>
              </div>

              <div className="flex flex-col lg:flex-row justify-start  items-center p-4">
                <div className="pr-3  font-medium text-sky-500">
                  Years of experience :
                </div>
                <div>{job?.yearsOfExperienceRequired}</div>
              </div>
            </div>
          </div>
          {/*Optional qulifaction  */}
          <div className="pt-2">
            <h2 className="font-semibold text-xl  dark:text-blue-100 ">
              Recommended Expertise
            </h2>
            <div className="flex-col flex text-lg  ">
              <div className="flex flex-col lg:flex-row justify-between  items-center p-4 ">
                <div className="pr-8 w-full  lg:w-3/12 font-medium text-sky-500">
                  Advantageous Attributes :
                </div>
                <p>{job?.optionalQualification}</p>
              </div>

              <div className="flex flex-col lg:flex-row justify-start  items-center p-4">
                <div className="pr-3  font-medium text-sky-500">
                  Recommended Years of experience :
                </div>
                <div>{job?.yearsOfExperienceRecommanded}</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-xl  dark:text-blue-100 ">
              Target Profile :
            </h2>{" "}
            <div className="text-lg">{job?.targetProfile}</div>
          </div>
          <div>
            <h2 className="font-semibold text-xl  dark:text-blue-100 ">
              Benefit :
            </h2>{" "}
            <div className="text-lg">{job?.benefits}</div>
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
