import { LiaHandsHelpingSolid } from "react-icons/lia";
import { FaComputer } from "react-icons/fa6";
import { TbDeviceMobileCode } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";
import SingleService from "./SingleService";
import { useTranslation } from "react-i18next";

const ServicesList = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: FaComputer,
      title: t("serviceTitle1"),
      descr: t("serviceDescrip1"),
    },
    {
      icon: TbDeviceMobileCode,
      title: t("serviceTitle2"),
      descr: t("serviceDescrip2"),
    },
    {
      icon: GiArtificialIntelligence,
      title: t("serviceTitle3"),
      descr: t("serviceDescrip3"),
    },
  ];

  return (
    <div className="w-10/12 mx-auto flex flex-col">
      <div className="mt-8 flex justify-center items-center">
        <LiaHandsHelpingSolid className="text-4xl text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300">
          {t("our_service")}
        </h1>
      </div>
      <div className="flex flex-col justify-between items-center lg:flex-row lg:justify-evenly">
        {services.map((service, index) => {
          return (
            <SingleService
              key={index}
              Icon={service.icon}
              title={service.title}
              descr={service.descr}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ServicesList;
