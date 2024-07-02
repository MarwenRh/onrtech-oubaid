import { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, upgradeUser } from "../../../redux/features/auth/authSlice";

type Props = {
  _id: string;
  email: string;
  disableChange: boolean;
};

const ChangeRole = ({ _id, disableChange }: Props) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();
  // Change User role
  const changeRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("change");
    if (!userRole) {
      toast.error("Please select a role");
      return;
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    dispatch(upgradeUser(userData));
    dispatch(getUsers());
  };
  return (
    <div>
      <form className="flex justify-center items-center" onSubmit={changeRole}>
        <select
          className="px-3 border border-gray-500 dark:bg-gray-400 rounded-md font-semibold"
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
          }}
          disabled={disableChange}
        >
          <option value="">-- Set role --</option>
          <option value="User">User</option>
          <option value="Web Editor">Web Editor</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-1 px-2 rounded inline-flex items-center"
        >
          <FaCheck className="w-5 h-5 mr-2" />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
