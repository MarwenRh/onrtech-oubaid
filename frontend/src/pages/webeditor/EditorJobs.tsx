import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

import { BiEdit, BiInfoCircle, BiTrash } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { FaHandshake } from "react-icons/fa";
import useRedirectLoggedOutUser from "../../hooks/userRedirectLoggedOutUser";

import { useSelector } from "react-redux";

import axios from "axios";
import { Loader } from "../../components/loader/Loader";
import JobsCard from "../admin/Jobs/JobsCard";
import { toast } from "react-toastify";
import useRedirectOnlyEditors from "../../hooks/useRedirectOnlyEditors";
import { RootState } from "../../redux/store";
const EditorJobs = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyEditors("/profile");
  const [editorJobs, setEditorJobs] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const editorId = user?._id;
  const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const getEditorJobs = async () => {
      if (editorId) {
        try {
          const resp = await axios.get(
            `${BACKEND_URL}}/jobs/editor/${editorId}`
          );
          setEditorJobs(resp.data.editorJobs);
          setCount(resp.data.count);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast.error("We hit an error please try again later");
          // Handle error and mark loading as complete
        }
      } else {
        setLoading(true);
      }
    };

    getEditorJobs();
  }, [editorId]);
  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = editorJobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(editorJobs.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % editorJobs.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="p-4 dark:bg-slate-900">
      {loading ? ( // Conditional rendering based on loading state
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8 dark:text-gray-100 ">Jobs List</h1>
            <Link to="/createJob">
              <div className="flex flex-col items-center justify-center">
                <MdOutlineAddBox className="text-sky-800 text-4xl dark:text-sky-400" />
                <h2 className="text-sky-600 text-lg font-bold dark:text-sky-400">
                  {" "}
                  Add New Job Offer
                </h2>
              </div>
            </Link>
          </div>
          <div className="w-9/12 mx-auto text-center mb-8">
            <div className="text-xl text-gray-700 mt-4">
              <span className=" text-blue-600 text-2xl font-bold">
                Editor Notice:
              </span>{" "}
              <span className="font-semibold dark:text-gray-100 ">
                You are currently overseeing {count} job offers you've written
              </span>{" "}
              <div className="flex flex-col md:flex-row items-center justify-center mt-4 ">
                <div className="mr-3">
                  <FaHandshake size={50} className="text-cyan-700" />
                </div>
                <div className="ml-3">
                  <div className="text-gray-700 text-xl dark:text-gray-100  ">
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
                <p className="px-1 text-gray-600 text-lg dark:text-gray-100 ">
                  to dive into job details
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiTrash size={32} color="red" />
                <p className="px-1 text-gray-600 text-lg dark:text-gray-100 ">
                  to remove a job post
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiEdit size={32} color="yellow" />
                <p className="px-1 text-gray-600 text-lg  dark:text-gray-100 ">
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
export default EditorJobs;
