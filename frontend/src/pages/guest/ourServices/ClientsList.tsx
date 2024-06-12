import microsoft from "../../../assets/Microsoft.svg";
import Leroy_Merlin from "../../../assets/Leroy_Merlin.svg";
import Solocal from "../../../assets/solocal.svg";
import Bnp from "../../../assets/bnp_paribas.svg";
import Ncr from "../../../assets/ncr.svg";
import caisse_des_depots_et_consignations from "../../../assets/caisse-des-depots-et-consignations-logo.svg";
import NcDarty from "../../../assets/darty.svg";
import { FaPersonCircleCheck } from "react-icons/fa6";
import SingleClient from "./SingleClient";
import { useTranslation } from "react-i18next";

const ClientsList = () => {
  const { t } = useTranslation();
  const clients = [
    {
      logo: microsoft,
      description: t("microsoft"),
    },
    {
      logo: Leroy_Merlin,
      description: t("Leroy_Merlin"),
    },
    {
      logo: Solocal,
      description: t("Solocal"),
    },
    {
      logo: Bnp,
      description: t("Bnp"),
    },

    {
      logo: Ncr,
      description: t("Ncr"),
    },
    {
      logo: caisse_des_depots_et_consignations,
      description: t("caisse_des_depots_et_consignations"),
    },
    {
      logo: NcDarty,
      description: t("NcDarty"),
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="mb-4 mt-8 flex justify-center items-center">
        <FaPersonCircleCheck className="text-4xl text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300">
          {t("our_clients")}
        </h1>
      </div>

      <div className="w-10/12 flex flex-wrap justify-center">
        {clients.map((client, index) => {
          return (
            <SingleClient
              key={index}
              logo={client.logo}
              descr={client.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClientsList;
