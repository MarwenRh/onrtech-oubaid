import { useTranslation } from "react-i18next";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const { t } = useTranslation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/subscriptions`,
        { email }
      );
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  return (
    <div className="w-full py-16 text-white px-4 bg-cyan-600 dark:bg-slate-800">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            {t("Stay_Updated")}
          </h1>
          <p> {t("Sign_Up")}</p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-center items-center"
            >
              <input
                className="text-gray-800 p-3 flex w-full rounded-md border-gray-300 bg-gray-50 focus:border-blue border-2 border-solid 
       focus:border-blue-500 focus:outline-1 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-blue50 dark:placeholder-blue-100 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-100"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-gray-700 text-lg  bg-blue-300 rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3"
              >
                {t("Notify_Button")}
              </button>
            </form>
          </div>
          <p>
            {t("Data_Protection")}{" "}
            <span className="text-blue-500 font-bold hover:cursor-pointer hover:underline hover:text-blue-700">
              {t("Privacy_Policy")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
