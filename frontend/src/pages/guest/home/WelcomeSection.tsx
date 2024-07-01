import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SingleArticleCard from "../../../components/reusableComponents/SingleArticleCard";

const WelcomeSection = () => {
  const [articles, setArticles] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const getNewestArticles = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:5000/api/articles/newestArticles"
        );
        setArticles(resp.data.topThreeArticles);
      } catch (error) {
        console.log(error);
      }
    };
    getNewestArticles();
  }, []);

  return (
    <div>
      <div className="dark:bg-slate-700 bg-gray-100 py-16 mt-4 ">
        <div className="dark:bg-slate-700 bg-gray-100 container mx-auto text-center">
          <h1 className="dark:text-white text-3xl font-bold mb-6 text-gray-800">
            {t("Discover_Tech_Insights")}
          </h1>
          <p className="dark:text-blue-50 text-lg text-gray-600 mb-8">
            {t("Welcome_Text")}
          </p>
        </div>
      </div>
      <div className="mx-auto w-full flex flex-wrap justify-center">
        {articles.map((article, index) => (
          <SingleArticleCard
            key={index}
            article={article}
            style="rounded-lg shrink shadow-lg shadow-blue-200 hover:-translate-y-3 m-4"
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;
