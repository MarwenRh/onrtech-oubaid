import { useEffect, useState } from "react";
import JobsList from "./JobsList";
import Testimonials from "./Testimonial";
import axios from "axios";
import { Loader } from "../../../components/loader/Loader";
import { FaFileContract, FaSearch, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { MdPlace } from "react-icons/md";
import { offers } from "../../../types/types";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

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
          `${BACKEND_URL}/jobs/getPublishedJobs`
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
    <div className="min-h-screen dark:bg-slate-900 bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaBriefcase className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Career Opportunities
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover exciting career opportunities and join our team of talented professionals
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {filteredJobs.length} positions available
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Jobs
                  </label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder={t("search_job")}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    />
                    {searchInput && (
                      <button
                        onClick={() => setSearchInput("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <TiDelete size={20} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location Type
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white appearance-none"
                    >
                      <option value="">All Locations</option>
                      <option value="On-Site">On-Site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Contract Type Filter */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contract Type
                  </label>
                  <div className="relative">
                    <FaFileContract className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={contractTypeFilter}
                      onChange={(e) => setContractTypeFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white appearance-none"
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

              {/* Active Filters Display */}
              {(searchInput || locationFilter || contractTypeFilter) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                    {searchInput && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Search: "{searchInput}"
                        <button
                          onClick={() => setSearchInput("")}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {locationFilter && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Location: {locationFilter}
                        <button
                          onClick={() => setLocationFilter("")}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {contractTypeFilter && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        Contract: {contractTypeFilter}
                        <button
                          onClick={() => setContractTypeFilter("")}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Jobs List */}
          <JobsList jobs={currentItems} />

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-12">
              <ReactPaginate
                breakLabel="..."
                nextLabel={t("paginationNext")}
                previousLabel={t("paginationPrevious")}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center gap-2"
                pageLinkClassName="px-3 py-2 text-sm leading-tight text-blue-700 bg-white rounded-md border border-blue-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-300 dark:border-white/10"
                previousLinkClassName="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                nextLinkClassName="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                breakLinkClassName="px-3 py-2 text-sm text-blue-700 bg-white rounded-md border border-blue-200 dark:bg-slate-800 dark:text-blue-300 dark:border-white/10"
                activeLinkClassName="ring-2 ring-blue-500"
              />
            </div>
          )}

          {/* Testimonials */}
          <div className="mt-16">
            <Testimonials />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
