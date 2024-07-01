import ActiveSlider from "../../components/reusableComponents/ActiveSlider";
import useRedirectOnlyEditors from "../../hooks/useRedirectOnlyEditors";
import useRedirectLoggedOutUser from "../../hooks/userRedirectLoggedOutUser";
import CreateClient from "./CreateClient";

const Clients = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyEditors("/profile");
  return (
    <div className="dark:bg-slate-900">
      <ActiveSlider autoplayState={false} />
      <CreateClient />
    </div>
  );
};

export default Clients;
