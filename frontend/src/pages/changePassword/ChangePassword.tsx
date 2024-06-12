import Card from "../../components/card/Card";

import { useState } from "react";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import useRedirectLoggedOutUser from "../../hooks/userRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RESET,
  changePassword,
  logout,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";
type formDataType = {
  oldPassword: string;
  password: string;
  password2: string;
};
const ChangePassword = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useRedirectLoggedOutUser("/login");
  const initState: formDataType = {
    oldPassword: "",
    password: "",
    password2: "",
  };
  const [formData, setformData] = useState<formDataType>(initState);
  const { oldPassword, password, password2 } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !password || !password2) {
      toast.error("All fields are required");
    }
    if (password !== password2) {
      return toast.error("Password do not match");
    }
    const userData = {
      oldPassword,
      password,
    };
    const emailData = {
      subject: "Password changed -ONRTECH",
      send_to: user.email,
      reply_to: "noreply@onrtech.com",
      template: "changePassword",
      url: "/forgot",
    };
    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET());
    navigate("/login");
  };
  return (
    <>
      <section className="bg-gray-50 py-10 dark:bg-slate-900 ">
        <div className="container  mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 dark:text-white">
            Change Password
          </h2>
          <div className="flex justify-center items-center border-red-500">
            <Card style=" border border-red-600 ">
              <div className="p-5"></div>
              <form className="p-5 " onSubmit={updatePassword}>
                <div className="mb-4">
                  <label
                    className="block text-lg font-medium text-gray-700"
                    htmlFor=""
                  >
                    Current Password :
                  </label>
                  <PasswordInput
                    placeholder="old Password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-medium text-gray-700"
                    htmlFor=""
                  >
                    New Password
                  </label>
                  <PasswordInput
                    placeholder="New Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-medium text-gray-700"
                    htmlFor=""
                  >
                    confirm New Password
                  </label>
                  <PasswordInput
                    placeholder="confirm New Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                  />
                </div>
                {isLoading ? (
                  <div className="text-center">
                    <Spinner />
                  </div>
                ) : (
                  <button className="bg-red-500 text-white p-1 rounded-md w-full hover:bg-red-800">
                    Change Password
                  </button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
