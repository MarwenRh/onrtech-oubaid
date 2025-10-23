import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { Application } from "../../../types/types";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import { FaTrashCan, FaDownload, FaUser, FaBriefcase } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { BiCheckCircle } from "react-icons/bi";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import { MdCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

const Applications = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/applications`);
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("We had a problem please try again later");
      }
    };
    fetchApplications();
  }, []);

  // accepting
  const acceptApp = async (id: string) => {
    try {
      await axios.patch(`${BACKEND_URL}/applications/accept/${id}`);
      toast.success("You have accepted this application");
    } catch (error) {
      toast.error("Error accepting application");
    }
  };
  // rejecting
  const rejectApp = async (id: string) => {
    try {
      await axios.patch(`${BACKEND_URL}/applications/reject/${id}`);
      toast.success("You have rejected this application");
    } catch (error) {
      toast.error("Error rejecting application");
    }
  };
  // deleting
  const removeApp = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/applications/applications/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error deleting application");
    }
  };
  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = applications.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(applications.length / itemsPerPage);
  // end pagination

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % applications.length;
    setItemOffset(newOffset);
  };
  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete This application",
      message: "Are you sure to do delete this application?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeApp(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
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
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Job Applications
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Review and manage job applications from candidates
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center">
                  <FaBriefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Total Applications
                    </p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {applications.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentItems.map((application, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                  application.state === "accepted"
                    ? "border-green-200 dark:border-green-800"
                    : application.state === "rejected"
                    ? "border-red-200 dark:border-red-800"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="p-6">
                  {/* Header with Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <FaUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {application.applicantName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {application.applicantEmail}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {application.state === "accepted" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Accepted
                        </span>
                      ) : application.state === "rejected" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <FaBriefcase className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Applied for
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {application.offerTitle}
                    </p>
                  </div>

                  {/* Resume Download */}
                  <div className="mb-6">
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <FaDownload className="h-4 w-4 mr-2" />
                      Download Resume
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {application.state !== "accepted" && (
                        <button
                          onClick={() => acceptApp(application._id)}
                          className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="Accept Application"
                        >
                          <BiCheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {application.state !== "rejected" && (
                        <button
                          onClick={() => rejectApp(application._id)}
                          className="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                          title="Reject Application"
                        >
                          <MdCancel className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => confirmDelete(application._id)}
                      className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete Application"
                    >
                      <FaTrashCan className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBriefcase className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No applications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Job applications will appear here when candidates apply for your positions.
              </p>
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-12">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
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
        </div>
      )}
    </div>
  );
};

export default Applications;
