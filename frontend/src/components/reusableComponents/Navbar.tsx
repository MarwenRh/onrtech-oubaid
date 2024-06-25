import Button from "./Button";
import LanguageSelector from "./LanguageSelector";
import Linkslist from "./LinksList";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import {
  AdminLink,
  AuthorLink,
  ShowOnLogin,
  ShowOnLogout,
  UserLink,
} from "../protect/hiddenLinks";
import { UserName } from "../../pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [nav, setNav] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleNav = () => {
    setNav(!nav);
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };
  // Links for the guest
  const guestLinks = [
    { value: t("Home"), path: "/" },
    { value: t("Services"), path: "/services" },
    { value: t("Get_in_Touch"), path: "/about" },
    { value: t("Tech_Insights"), path: "/techInsight" },
    { value: t("Job_Openings"), path: "/careers" },
  ];
  // Links for the user
  const userLinks = [
    { value: t("Home"), path: "/" },
    { value: "Profile", path: "/profile" },
    { value: t("Services"), path: "/services" },
    { value: t("Get_in_Touch"), path: "/about" },
    { value: t("Tech_Insights"), path: "/techInsight" },
    { value: t("Job_Openings"), path: "/careers" },
  ];
  // Links for the admin
  const adminLinks = [
    { value: "Profile", path: "/profile" },
    { value: "Users", path: "/users" },
    { value: "Subscribers", path: "/subscribers" },
    { value: "Submissions", path: "/forms" },
    { value: "Jobs", path: "/ManageJobs" },
    { value: "Articles", path: "/ManageArticles" },
    { value: "Job Apps", path: "/applications" },
  ];
  // Links for the web editor
  const authorLinks = [
    { value: "Profile", path: "/profile" },
    { value: "My Articles", path: "/editorArticles" },
    { value: "My Job Offers", path: "/editorJobs" },
    { value: "Clients", path: "/ourClients" },
    { value: "Testimonials", path: "/ourTestimonials" },
  ];
  return (
    <div className="w-full pb-2 dark:bg-slate-900">
      <div className="mx-auto pt-2 w-full  h-full flex justify-evenly items-center flex-row">
        <Logo />
        <div className="hidden h-full xl:flex flex-row text-lg justify-evenly items-center w-6/12 text-gray-700">
          <ShowOnLogout>
            <Linkslist links={guestLinks} />
          </ShowOnLogout>
          <ShowOnLogin>
            <UserLink>
              <Linkslist links={userLinks} />
            </UserLink>
            <AdminLink>
              <Linkslist links={adminLinks} />
            </AdminLink>

            <AuthorLink>
              <Linkslist links={authorLinks} />
            </AuthorLink>
          </ShowOnLogin>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <LanguageSelector />
        </div>

        <ThemeSwitcher style="pt-2 hidden md:block" />

        <ShowOnLogin>
          <Link to={"/profile"} className="flex items-center mx-2">
            <img
              src={user?.photo}
              alt="User Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
            <UserName />
          </Link>
        </ShowOnLogin>
        <ShowOnLogout>
          <Link to={"login"}>
            {" "}
            <Button
              visibility="hidden xl:block md:py-2 md:px-2.5 lg:py-1.5 lg:px-4"
              value={t("signUp")}
            />
          </Link>
        </ShowOnLogout>

        <ShowOnLogin>
          <Button
            visibility="hidden xl:block md:py-1 md:px-2.5 lg:py-1.5 lg:px-4"
            value="Logout"
            onClick={logoutUser}
          />
        </ShowOnLogin>

        <div onClick={handleNav} className="block xl:hidden">
          {nav ? (
            <AiOutlineClose
              className="text-blue-400 cursor-pointer mt-1"
              size={23}
            />
          ) : (
            <AiOutlineMenu
              className="text-blue-400 cursor-pointer mt-1"
              size={23}
            />
          )}
        </div>
      </div>
      <ThemeSwitcher style="pt-2 block md:hidden pt-1 text-center" />

      <MobileNavbar nav={nav} />
    </div>
  );
};
export default Navbar;
