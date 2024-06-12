import { Link, useNavigate } from "react-router-dom";
import { BiEdit, BiTrash, BiInfoCircle, BiCheckCircle } from "react-icons/bi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const JobSingleCard = ({ job }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  // approve job
  const approveJob = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs/approveJob/${id}`);
      toast.success("Job approved successfully");
      navigate("/ManageJobs");
    } catch (error) {
      console.log(error);
      toast.error("We had a problem please try later");
    }
  };
  const removeJob = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error deleting article");
    }
  };
  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete Job offer",
      message: "Are you sure to do delete this Job Offer?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeJob(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow  m-4 flex flex-row max-w-96 mx-2 dark:bg-gray-700 ">
      <div className="flex flex-col items-center justify-evenly  my-8 ">
        <Link to={`/EditJobAdmin/${job._id}`}>
          <BiEdit className="text-yellow-500 cursor-pointer  size-7" />
        </Link>
        <BiTrash
          className="text-red-500 cursor-pointer size-7"
          onClick={() => confirmDelete(job._id)}
        ></BiTrash>
        <div>
          {user?.role === "Web Editor" && (
            <div>
              {job.published === false ? (
                <h3 className="text-red-500 font-bold">Waiting for approval</h3>
              ) : (
                <h3 className="text-green-500 font-bold">Publihsed</h3>
              )}
            </div>
          )}
        </div>
        {job.published === false && user?.role === "Admin" && (
          <div className="my-1">
            <BiCheckCircle
              className="text-green-500 cursor-pointer"
              size={24}
              onClick={() => approveJob(job._id)}
            />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {job.title}
          </h2>
          <Link to={`/jobInfoAdmin/${job._id}`}>
            <BiInfoCircle className="text-blue-500 size-7 " />
          </Link>
        </div>
        <p className="text-gray-600 mt-1 dark:text-gray-100">
          {" "}
          {job.description.split(" ").slice(0, 8).join(" ")}
          {job.description.split(" ").length > 8 ? "..." : ""}
        </p>
        <div className="mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-100">
            <span className="text-gray-700 dark:text-blue-500 text-base font-bold ">
              Benefits:
            </span>{" "}
            {job.benefits}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-100">
            <span className="text-gray-700 dark:text-blue-500 text-base font-bold ">
              Location:
            </span>
            {job.locationPlace}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-100">
            <span className="text-gray-700 dark:text-blue-500 text-base font-bold ">
              Income:
            </span>{" "}
            {job.incomeValue} {job.incomeCurrency} / {job.incomePeriod}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSingleCard;
