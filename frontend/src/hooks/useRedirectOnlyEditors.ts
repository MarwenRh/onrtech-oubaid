import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useRedirectOnlyEditors = (path: string) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      const redirectLoggedOutUser = async () => {
        if (user?.role !== "Web Editor") {
          toast.info("This is a private Web Editor interface");
          navigate(path);
        }
        // Set loading state to false after redirection logic
      };
      redirectLoggedOutUser();
    }
  }, [path, navigate, user]);

  // Render Loader component if loading state is true
};

export default useRedirectOnlyEditors;
