import StatsIcons from "./StatsIcons";
import { useTranslation } from "react-i18next";

const Stats = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <section className="py-8 bg-blue-500 text-white text-center mt-3 dark:bg-slate-700">
        <h2 className="text-4xl font-bold">{t("Impressive_Stats")}</h2>
        <p className="mt-2 text-lg">{t("Explore_Numbers")}</p>
      </section>
      <section className="bg-gray-200    dark:bg-slate-600 ">
        <div className="    mx-auto flex flex-row justify-between items-center  md:justify-evenly">
          <StatsIcons />
        </div>
      </section>
    </div>
  );
};

export default Stats;
