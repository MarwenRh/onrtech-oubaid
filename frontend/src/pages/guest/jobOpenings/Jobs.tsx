import { useEffect, useState } from "react";
import JobsList from "./JobsList";
import Testimonials from "./Testimonial";
import axios from "axios";
import { Loader } from "../../../components/loader/Loader";
import { FaFileContract, FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { MdPlace } from "react-icons/md";
import { offers } from "../../../types/types";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [contractTypeFilter, setContractTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<offers>([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/jobs/getPublishedJobs`
        );
        setJobs(response.data.publishedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    getJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.description.toLowerCase().includes(searchInput.toLowerCase()) &&
      (locationFilter === "" || job.locationType === locationFilter) &&
      (contractTypeFilter === "" || job.contractType === contractTypeFilter)
  );

  // Begin Pagination
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredJobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jobs.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % jobs.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="dark:bg-slate-900 ">
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="pt-4 pb-4 ">
            <div className="mx-auto w-10/12 bg-gray-100 rounded-lg lg:h-52 h-96 t-2 flex flex-col justify-center dark:bg-slate-600">
              <div className="w-10/12 lg:h-2/5 h-full m-8 mx-auto bg-white shadow-lg shadow-gray-500 rounded-xl flex lg:flex-row items-center justify-evenly flex-col p-2 dark:bg-gray-300 ">
                <div className="flex l justify-evenly items-center flex-row p-2">
                  <FaSearch
                    size={28}
                    className=" text-black dark:text-blue-700 mr-2"
                  />
                  <input
                    value={searchInput}
                    type="text"
                    className=" outline-none border-none w-full p-1   pl-8 text-lg text-gray-900  rounded-lg bg-white dark:bg-gray-100 
         
        dark:placeholder-gray-900
         dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder:text-gray-500"
                    placeholder={t("search_job")}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />

                  <TiDelete
                    onClick={() => {
                      setSearchInput("");
                    }}
                    size={30}
                    className="text-gray-400 hover:cursor-pointer hover:text-gray-800"
                  />
                </div>
                <div className="flex flex-row justify-evenly items-center">
                  <MdPlace
                    size={28}
                    className="text-black mr-2 dark:text-blue-700"
                  />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="mr-3 rounded-lg p-1.5 dark:bg-gray-100"
                  >
                    <option value="">All Locations</option>
                    <option value="On-Site">On-Site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="flex flex-row justify-evenly items-center">
                  <FaFileContract
                    size={22}
                    className="text-black mr-2 dark:text-blue-700"
                  />
                  <select
                    value={contractTypeFilter}
                    onChange={(e) => setContractTypeFilter(e.target.value)}
                    className="mr-3 rounded-lg p-1.5 dark:bg-gray-100"
                  >
                    <option value="">All Contract Types</option>
                    <option value="Full Time">Full-time</option>
                    <option value="Part Time">Part-time</option>
                    <option value="Contract Work">Contract Work</option>
                    <option value="Freelancing">Freelancing</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <JobsList jobs={currentItems} />

          <ReactPaginate
            breakLabel="..."
            nextLabel={t("paginationNext")}
            previousLabel={t("paginationPrevious")}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-center space-x-2"
            pageLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
            previousLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-l hover:bg-blue-700"
            nextLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-r hover:bg-blue-700"
            breakLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
            activeLinkClassName="py-2 px-3 leading-tight text-blue-900 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
          />
          <Testimonials />
        </div>
      )}
    </div>
  );
};

export default Jobs;
