import SingleNavLink from "./SingleNavLink";
type props = {
  linksList: string[];
  sectionName: string;
};

const FooterLinks = ({ linksList, sectionName }: props) => {
  return (
    <div>
      <h6 className="font-medium text-gray-600">{sectionName}</h6>
      <ul>
        {linksList.map((item, index) => {
          return (
            <li key={index} className="py-2">
              <SingleNavLink path="/workInProgress" value={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;
