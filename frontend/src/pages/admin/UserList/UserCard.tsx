import { FaTrashCan } from "react-icons/fa6";
import { User } from "../../../types/types";
import ChangeRole from "./ChangeRole";
import { deleteUser } from "../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  const { _id, name, email, role, photo } = user;
  const dispatch = useDispatch();
  const removeUser = async (id: string) => {
    await dispatch(deleteUser(id));
  };

  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="rounded-md w-[360px] h-[450px]  overflow-hidden shadow-lg bg-gray-100 dark:bg-slate-800 m-10">
      <img
        className="p-5 h-48 text-center  mx-auto rounded-full"
        src={photo}
        alt="User photo"
      />
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
          {name}
        </div>
        <p className="text-gray-700 font-semibold dark:text-gray-300 text-base">
          Role: {role}
        </p>
        <p className="text-gray-700 font-semibold dark:text-gray-300 text-base">
          Job Title: Onrtech Member
        </p>
        <p className="text-gray-700 font-semibold dark:text-gray-300 text-base">
          {email}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <ChangeRole _id={_id} email={email} />
        <FaTrashCan
          size={27}
          className="text-red-500 hover:text-red-700 cursor-pointer dark:text-red-800 dark:hover:text-red-950"
          onClick={() => confirmDelete(_id)}
        />
      </div>
    </div>
  );
};

export default UserCard;
