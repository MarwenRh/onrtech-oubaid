import { useEffect } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";

import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, loginWithGoogle } from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import { AppDispatch, RootState } from "../../redux/store";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, isError } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError]);
  const googleLogin = async (credentialResponse) => {
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
    console.log(credentialResponse);
  };

  return (
    <div className="flex justify-center items-center h-screen dark:bg-slate-900 bg-gray-100">
      {isLoading && <Loader />}
      <Card>
        <div className="flex  flex-col items-center">
          <div className="flex flex-col items-center justify-center pb-8">
            <BiLogIn size={35} className="text-sky-400" />
            <h2 className="text-4xl font-bold text-sky-700">Login</h2>
          </div>

          <GoogleLogin
            onSuccess={googleLogin}
            onError={() => {
              console.log("Login Failed");
              toast.error("Login failed");
            }}
          />
        </div>
        <div className="inline text-center">
          <Link to="/" className="inline hover:underline text-blue-500">
            return to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
