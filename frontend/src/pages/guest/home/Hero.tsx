import { ReactTyped } from "react-typed";
import Button from "../../../components/reusableComponents/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="dark:bg-slate-900  bg-white">
      <div className="max-w-[800px] w-full mx-auto text-center flex flex-col pt-10">
        <h1 className="text-sky-300 text-4xl font-bold dark:text-blue-500">
          {t("Bring_Your_Business_Online")}
        </h1>
        <h2 className="text-sky-400 text-3xl font-bold mt-2 dark:text-blue300">
          {t("With")} ONRTECH
        </h2>
        <h1 className="text-sky-500 mt-3  font-bold text-2xl">
          {t("Elevating_businesses")}
        </h1>
        <ReactTyped
          className="text-5xl md:text-6xl   text-cyan-500 font-bold md:pl-4 pl-2 mt-2 dark:text-cyna my-3"
          strings={[
            t("Mobile_Innovation"),
            t("Web_Excellence"),
            t("AI_Empowerment"),
          ]}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
        <h5 className="text-gray-700 text-xl md:text-2xl font-bold mt-4 dark:text-white">
          {t("We_Help_You_Build")}
        </h5>
        <Link to={"/about"}>
          <Button
            visibility="py-2.5 px-3.5 md:py-2 md:px-3.5 lg:py-3 lg:px-5 mt-4 mx-auto font-bold "
            value={t("Contact_us")}
          />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
