import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/features/auth/authServices";

const useRedirectLoggedOutUser = (path: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn: boolean;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }

      if (!isLoggedIn) {
        toast.info("please login to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [path, navigate]);
};

export default useRedirectLoggedOutUser;
