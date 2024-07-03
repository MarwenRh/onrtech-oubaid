import { useTranslation } from "react-i18next";
import it from "../../../assets/MicrosoftTeams-image-1-1024x683.jpg";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-4 ">
      <div className="bg-gray-50 w-full h-[530px] lg:h-72 flex flex-col lg:flex-row-reverse items-center justify-between dark:bg-slate-900">
        <img
          src={it}
          alt="it consulting"
          className="h-2/4 lg:h-full  w-11/12 lg:w-2/5 rounded-l-full"
        />
        <div className="mx-auto w-11/12  rounded-lg flex flex-col items-center justify-center text-center md:w-6/12 ">
          <div className="p-6">
            <h4
              className="lg:text-4xl text-2xl font-bold text-slate-600 mb-6  decoration-sky-500 dark:text-blue-800
            dark:decoration-blue-700
            "
            >
              {t("about_welcome")}
            </h4>
            <p className="text-gray-700 text-xl  font-semibold mb-4 dark:text-gray-50">
              {t("about_txt")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
