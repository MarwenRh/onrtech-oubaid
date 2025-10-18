import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SingleArticleCard from "../../../components/reusableComponents/SingleArticleCard";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

const WelcomeSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const getNewestArticles = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/articles/newestArticles`);
        setArticles(resp.data.topThreeArticles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getNewestArticles();
  }, []);

  return (
    <div className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
            <FaBookOpen className="w-4 h-4 mr-2" />
            Latest Insights
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Discover_Tech_Insights")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t("Welcome_Text")}
          </p>
          <Link
            to="/tech-insights"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <span className="mr-2">View All Articles</span>
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={index} className="transform hover:-translate-y-2 transition-transform duration-300">
                <SingleArticleCard
                  article={article}
                  style="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No articles available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for the latest tech insights and updates.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {articles.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated with Tech Trends
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Get the latest insights on web development, mobile innovation, and AI technologies delivered to your inbox.
              </p>
              <Link
                to="/tech-insights"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <span className="mr-2">Explore All Articles</span>
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeSection;
