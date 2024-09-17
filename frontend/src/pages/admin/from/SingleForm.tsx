import { BiTrash } from "react-icons/bi";
import { Form } from "../../../types/types";
import { formatDate } from "../../../utils/fomatDate";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  form: Form;
};
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
const SingleForm = ({ form }: Props) => {
  // Delete an article
  const removeSub = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/forms/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error deleting article");
    }
  };

  // confim delete
  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete This submission",
      message: "Are you sure you want to delete this submission",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeSub(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  return (
    <div className="m-4 dark:text-white ">
      <div className="bg-blue-50 shadow-md rounded-lg p-4 w-96 min-h-[70px] dark:bg-slate-500 ">
        <div className="flex flex-row items-center justify-between ">
          <h2 className="text-xl font-semibold">{form.name}</h2>
          <div>
            <BiTrash
              size={30}
              className="cursor-pointer"
              color="red"
              onClick={() => confirmDelete(form._id)}
            />
          </div>
        </div>

        <p className="text-gray-600 text-lg dark:text-white">
          <strong className="text-blue-500 font-bold ">Email:</strong>{" "}
          {form.email}
        </p>
        <p className="text-gray-600 text-lg dark:text-white">
          <strong className="text-blue-500 font-bold ">Reason:</strong>{" "}
          {form.reason}
        </p>
        <p className="text-gray-600 text-lg dark:text-white">
          <strong className="text-blue-500 font-bold ">Notes:</strong>{" "}
          {form.notes}
        </p>
        <p className="text-gray-600 text-lg dark:text-white">
          <strong className="text-blue-500 font-bold ">submitted At</strong>{" "}
          {formatDate(form.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default SingleForm;
