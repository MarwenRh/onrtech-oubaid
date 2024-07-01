import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { Application } from "../../../types/types";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import { FaTrashCan } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { BiCheckCircle } from "react-icons/bi";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import { MdCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";

const Applications = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications"
        );
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
      await axios.patch(`http://localhost:5000/api/applications/accept/${id}`);
      toast.success("You have accepted this application");
    } catch (error) {
      toast.error("Error accepting application");
    }
  };
  // rejecting
  const rejectApp = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/applications/reject/${id}`);
      toast.success("You have rejected this application");
    } catch (error) {
      toast.error("Error rejecting application");
    }
  };
  // deleting
  const removeApp = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
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
    <div className="container mx-auto p-4 dark:bg-slate-900">
      {loading ? (
        <Loader />
      ) : (
        <div className="m-4">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Job Applications : you have {currentItems.length} application to
            check
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr className="dark:bg-slate-500 ">
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-medium">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-medium">
                    Applicant Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-medium">
                    Job Title
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-medium">
                    Resume
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-medium">
                    <div className=" flex flex-col">
                      <p> Action</p>
                      <p>Accept / Reject /delete </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {applications.map((application, index) => (
                  <tr
                    key={index}
                    className={`${
                      application.state === "accepted"
                        ? "bg-gray-200 dark:bg-slate-500"
                        : application.state === "rejected"
                        ? "bg-gray-400 dark:bg-slate-800"
                        : "hover:bg-gray-50 dark:bg-slate-600"
                    }`}
                  >
                    <td className="px-6 py-4 border-b border-gray-200 dark:border-slate-600 text-base dark:text-gray-100">
                      {application.applicantName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 dark:border-slate-600 text-base dark:text-gray-300">
                      {application.applicantEmail}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 dark:border-slate-600 text-base dark:text-gray-300">
                      {application.offerTitle}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 dark:border-slate-600 text-base dark:text-gray-300">
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Download CV
                      </a>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 dark:border-slate-600 text-base dark:text-gray-300">
                      <div className="flex flex-row-reverse justify-center items-center">
                        <span className="flex justify-center">
                          <FaTrashCan
                            size={25}
                            className="text-red-700 hover:text-red-800 cursor-pointer m-1"
                            onClick={() => confirmDelete(application._id)}
                          />
                        </span>

                        {application.state === "rejected" ? (
                          <p className="text-orange-600 text-lg m-1 mr-3">
                            Rejected
                          </p>
                        ) : (
                          application.state !== "accepted" && (
                            <span className="flex justify-center">
                              <MdCancel
                                size={30}
                                className="text-orange-600 hover:text-orange-800 cursor-pointer m-1"
                                onClick={() => rejectApp(application._id)}
                                data-tip="Reject Application"
                              />
                            </span>
                          )
                        )}
                        {application.state === "accepted" ? (
                          <p className="text-green-500 text-lg font-bold m-1 mr-3">
                            Accepted
                          </p>
                        ) : (
                          application.state !== "rejected" && (
                            <span className="flex justify-center">
                              <BiCheckCircle
                                size={30}
                                className="text-green-500 hover:text-green-700 cursor-pointer m-1"
                                onClick={() => acceptApp(application._id)}
                              />
                            </span>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default Applications;
