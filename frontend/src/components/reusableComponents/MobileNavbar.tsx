import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import SingleNavLink from "./SingleNavLink";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  AdminLink,
  AuthorLink,
  ShowOnLogin,
  ShowOnLogout,
  UserLink,
} from "../protect/hiddenLinks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RESET, logout } from "../../redux/features/auth/authSlice";

type props = {
  nav: boolean;
};
const MobileNavbar = ({ nav }: props) => {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState("");

  useEffect(() => {
    setVisibility(nav ? "" : "hidden");
  }, [nav]);

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
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`${visibility} w-8/12 flex mx-auto flex-col font-medium p-4  mt-4 border border-gray-200 rounded-lg bg-blue-50   dark:bg-gray-800  dark:border-blue50 justify-center items-center  xl:hidden  `}
    >
      <ShowOnLogout>
        {guestLinks.map((link, index) => (
          <SingleNavLink key={index} value={link.value} path={link.path} />
        ))}
      </ShowOnLogout>
      <ShowOnLogin>
        <UserLink>
          {userLinks.map((link, index) => (
            <SingleNavLink key={index} value={link.value} path={link.path} />
          ))}
        </UserLink>

        <AdminLink>
          {adminLinks.map((link, index) => (
            <SingleNavLink key={index} value={link.value} path={link.path} />
          ))}
        </AdminLink>
        <AuthorLink>
          {authorLinks.map((link, index) => (
            <SingleNavLink key={index} value={link.value} path={link.path} />
          ))}
        </AuthorLink>
      </ShowOnLogin>

      <ShowOnLogin>
        <Button
          visibility="block  px-8 py-2 mt-2"
          value="Logout"
          onClick={logoutUser}
        />
      </ShowOnLogin>
      <ShowOnLogout>
        <Link to="/login">
          <Button visibility="block  px-8 py-2 mt-2" value={t("signUp")} />
        </Link>
      </ShowOnLogout>
    </div>
  );
};

export default MobileNavbar;
