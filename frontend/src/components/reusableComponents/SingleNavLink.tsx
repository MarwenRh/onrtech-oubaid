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
            ? "text-[17px]  transition-all duration-300"
            : " text-gray-500"
        } `
      }
    >
      {value}
    </NavLink>
  );
};

export default SingleNavLink;
