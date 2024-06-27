import { FaPersonCircleCheck } from "react-icons/fa6";

import { useTranslation } from "react-i18next";
import ActiveSlider from "../../../components/reusableComponents/ActiveSlider";

const ClientsList = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-4 mt-8 flex justify-center items-center">
        <FaPersonCircleCheck className="text-4xl text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300">
          {t("our_clients")}
        </h1>
      </div>

      <ActiveSlider />
    </div>
  );
};

export default ClientsList;
