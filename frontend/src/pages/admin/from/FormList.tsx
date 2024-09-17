import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "../../../types/types";

import { Loader } from "../../../components/loader/Loader";
import SingleForm from "./SingleForm";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

const FormList = () => {
  useRedirectLoggedOutUser("/login");

  useRedirectOnlyAdmins("/profile");
  const [forms, setForms] = useState<Form[]>([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForms = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/forms`);
        setForms(resp.data.forms);
        setCount(resp.data.count);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getForms();
  }, []);

  return (
    <div className="dark:bg-slate-900">
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
            {" "}
            {count} Submitted Forms
          </h1>
          <div className="flex flex-wrap items-center justify-evenly">
            {forms.map((form, index) => (
              <SingleForm form={form} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormList;
