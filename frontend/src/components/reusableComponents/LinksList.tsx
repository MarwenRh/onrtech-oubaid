import { link } from "../../types/types";
import SingleNavLink from "./SingleNavLink";
type Prop = {
  links: link[];
};

const Linkslist = ({ links }: Prop) => {
  return (
    <div className="hidden  h-full xl:flex flex-row text-lg justify-evenly items-center w-11/12 text-gray-700">
      {links.map((link, index) => (
        <SingleNavLink key={index} value={link.value} path={link.path} />
      ))}
    </div>
  );
};
export default Linkslist;
