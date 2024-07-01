import { useSelector } from "react-redux";
import { client } from "../../types/types";
import { RootState } from "../../redux/store";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
type Prop = {
  client: client;
};

const ClientCard = ({ client }: Prop) => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Delete a client
  const removeClient = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error deleting article");
    }
  };

  // Confirm delete
  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete This Article",
      message: "Are you sure you want to delete this article?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeClient(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  return (
    <div className="w-full h-full mx-auto bg-white rounded-xl shadow-md hover:shadow-lg dark:bg-slate-800">
      <img
        className="pt-2 h-20 w-28 bg-cover text-center border-solid mx-auto rounded-xl"
        src={client.companyLogo}
        alt={client.clientName}
      />

      <div className="p-2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold dark:text-indigo-400">
          {client.clientName}
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-300">
          {client.description}
        </p>
        <div className="mt-4">
          <span className="text-gray-500 dark:text-gray-400">
            Began working with us on:{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {client.joinDate}
          </span>
        </div>
        {/* deleting a client for a web editor */}
        <div>
          {user?.role === "Web Editor" && (
            <div className="my-1">
              <BiTrash
                className="text-red-500 cursor-pointer"
                size={24}
                onClick={() => confirmDelete(client._id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
