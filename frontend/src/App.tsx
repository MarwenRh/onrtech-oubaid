import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./Routes";
// import Loader from "./components/loader/Loader";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice";
import { AppDispatch, RootState } from "./redux/store";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <>
      <ToastContainer />

      <Routes />
    </>
  );
};
export default App;
