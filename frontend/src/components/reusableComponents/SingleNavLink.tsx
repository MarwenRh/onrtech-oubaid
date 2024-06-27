import { NavLink } from "react-router-dom";
type props = {
  value: string;
  path: string;
  style?: string;
};

const SingleNavLink = ({ value, path, style }: props) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-base font-bold hover:text-blue-400 mx-4 my-1.5 dark:text-white dark:hover:text-blue-400  ${style} ${
          isActive
            ? "transition-all duration-300 "
            : "dark:text-slate-500 text-gray-400 "
        } `
      }
    >
      {value}
    </NavLink>
  );
};

export default SingleNavLink;
