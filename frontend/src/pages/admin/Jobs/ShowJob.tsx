import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { JobOffer } from "../../../types/types";
import axios from "axios";

import { Loader } from "../../../components/loader/Loader";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";

const ShowJob = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [job, setJob] = useState<JobOffer | undefined>();
  useEffect(() => {
    const getJobById = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/jobs/getJob/${id}`
        );
        setJob(resp.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getJobById();
  }, [id]);

  return (
    <div className="dark:bg-slate-900 ">
      {loading || !job ? (
        <Loader />
      ) : (
        <div className="w-8/12 mx-auto bg-white  shadow-lg overflow-hidden dark:bg-slate-900  ">
          <div className="p-8">
            <h3 className="text-2xl text-indigo-600 font-bold">{job.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-100">
              {job.description}
            </p>
            <div className="mt-4">
              <span className="text-indigo-600 font-semibold">Benefits:</span>
              <p className="text-gray-600 dark:text-gray-100">{job.benefits}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Target Profile:
              </h4>
              <p className="text-gray-600 dark:text-gray-100">
                {job.targetProfile}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Qualifications:
              </h4>
              <p className="text-gray-600 dark:text-gray-100">
                Required: {job.requiredQualification}
              </p>
              <p className="text-gray-600 dark:text-gray-100">
                Optional: {job.optionalQualification}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Experience:
              </h4>
              <p className="text-gray-600 dark:text-gray-100">
                Required: {job.yearsOfExperienceRequired} years
              </p>
              <p className="text-gray-600 dark:text-gray-100">
                Recommended: {job.yearsOfExperienceRecommanded} years
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Location:
              </h4>
              <p className="text-gray-600 dark:text-gray-100">
                {job.locationType} - {job.locationPlace}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Contract:
              </h4>
              <p className="text-gray-600 dark:text-gray-100">
                {job.contractType} - {job.contractDuration}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">Income:</h4>
              <p className="text-gray-600 dark:text-gray-100">
                {job.incomeValue} {job.incomeCurrency} / {job.incomePeriod}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold ">
                Published:
              </h4>
              <p className="text-gray-600 dark:text-gray-100">
                {new Date(job.publishedAt).toLocaleDateString()} by {job.author}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowJob;
