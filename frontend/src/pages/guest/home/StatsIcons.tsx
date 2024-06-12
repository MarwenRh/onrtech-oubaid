import { useTranslation } from "react-i18next";
import { FaClock, FaCode, FaUsers, FaAward, FaGit } from "react-icons/fa";

const StatsIcons = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: FaClock, stat: "14,400", text: t("Hours") },
    { icon: FaGit, stat: "90", text: t("Projects") },
    { icon: FaUsers, stat: "60", text: t("Clients") },
    { icon: FaAward, stat: "15", text: t("Awards") },
    { icon: FaCode, stat: "1,500,000", text: t("Code_Lines") },
  ];

  return (
    <div className=" flex flex-wrap flex-row justify-evenly items-center w-11/12 mx-auto">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center lg:justify-between p-2 m-2 "
        >
          <item.icon
            size={40}
            className="dark:text-cyan text-3xl md:text-4xl text-center text-blue-500
          
            "
          />
          <div className="dark:text-white text-4xl font-bold mt-4 text-blue-800">
            {item.stat}
          </div>
          <h3 className="dark:text-white text-lg md:text-xl text-gray-700">
            {item.text}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default StatsIcons;
