import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="w-10/12 flex flex-col justify-center items-center mx-auto">
        <h2 className="text-5xl font-bold lg:text-7xl text-blue-500 m-4 mx-auto  text-center ">
          {t("services")}
        </h2>

        <p className="p-3 text-center text-xl text-gray-500 dark:text-gray-50">
          {t("services_Intro")}
        </p>
        <div className="w-10/12 flex flex-row justify-between items-center">
          <h2 className=" md:text-xl text-md lg:text-3xl text-cyan-400 font-bold ">
            {t("adj1")}
          </h2>
          <h2 className=" md:text-xl lg:text-3xl text-cyan-400 font-bold ">
            {t("adj2")}
          </h2>
          <h2 className=" md:text-xl text-md lg:text-3xl text-cyan-400 font-bold ">
            {t("adj3")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
