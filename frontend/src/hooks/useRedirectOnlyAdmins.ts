import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useRedirectOnlyAdminEditor = (path: string) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      const redirectLoggedOutUser = async () => {
        if (user?.role !== "Admin" && user?.role !== "Web Editor") {
          toast.info("This is a private interface dd");
          navigate(path);
        }
      };

      redirectLoggedOutUser();
    }
  }, [path, navigate, user]);
};

export default useRedirectOnlyAdminEditor;
