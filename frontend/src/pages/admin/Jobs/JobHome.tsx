import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import JobsCard from "./JobsCard";
import { Loader } from "../../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import { BiEdit, BiInfoCircle, BiTrash } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { FaHandshake } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

const JobHome = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const getUnpublishedJobs = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/jobs/getPublishedJobs`);
        setJobs(resp.data.publishedJobs);
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.log(error);
        setLoading(false); // Handle error and mark loading as complete
      }
    };

    getUnpublishedJobs();
  }, []);
  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = jobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jobs.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jobs.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4 dark:bg-slate-900">
      {loading ? ( // Conditional rendering based on loading state
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl my-8 dark:text-gray-100">Jobs List</h1>
            <Link to="/createJob">
              <div className="flex flex-col p-4 items-center justify-center">
                <MdOutlineAddBox className="text-sky-800 dark:text-sky-400 text-4xl" />
                <h2 className="text-sky-600 text-lg font-bold dark:text-sky-400">
                  Add New Job Offer
                </h2>
              </div>
            </Link>
            <Link to="/UnpublishedJob" className="mr-4">
              <div className="flex flex-col p-4 items-center justify-center">
                <CgSandClock className="text-sky-800 text-4xl dark:text-sky-400" />
                <h2 className="text-sky-600 text-lg font-bold dark:text-sky-400">
                  Awaiting Approval
                </h2>
              </div>
            </Link>
          </div>
          <div className="w-9/12 mx-auto text-center mb-8 ">
            <div className="text-xl text-gray-700 mt-4 dark:text-gray-100">
              <span className=" text-blue-600 text-2xl font-bold">
                Administrator Notice:
              </span>{" "}
              You are currently overseeing{" "}
              <span className="font-semibold ">
                {jobs.length} active job listings
              </span>{" "}
              <div className="flex flex-col md:flex-row items-center justify-center mt-4 ">
                <div className="mr-3">
                  <FaHandshake size={50} className="text-cyan-700" />
                </div>
                <div className="ml-3">
                  <div className="text-gray-700 text-xl dark:text-gray-100 ">
                    New job postings help attract top talent to your team.
                  </div>
                  <div className="text-gray-700 text-xl bg dark:text-gray-100 ">
                    Open roles mean growth opportunities - keep hiring!
                  </div>
                  <div className="text-gray-700 text-xl dark:text-gray-100  ">
                    Make your company an employer of choice by advertising open
                    positions..
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center">
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiInfoCircle size={32} color="blue" />
                <p className="px-1 text-gray-600 text-lg dark:text-gray-100">
                  to dive into job details
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiTrash size={32} color="red" />
                <p className="px-1 text-gray-600 text-lg dark:text-gray-100">
                  to remove a job post
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiEdit size={32} color="yellow" />
                <p className="px-1 text-gray-600 text-lg dark:text-gray-100 ">
                  to tweak a job post
                </p>
              </div>
            </div>
          </div>
          <div className="w-11/12 mx-auto">
            <JobsCard jobs={currentItems} />
          </div>
        </>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        // Tailwind CSS classes
        containerClassName="flex items-center justify-center space-x-2"
        pageLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        previousLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-l hover:bg-blue-700"
        nextLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-r hover:bg-blue-700"
        breakLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        activeLinkClassName="py-2 px-3 leading-tight text-blue-900 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
      />
    </div>
  );
};

export default JobHome;
