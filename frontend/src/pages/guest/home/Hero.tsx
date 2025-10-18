import { ReactTyped } from "react-typed";
import Button from "../../../components/reusableComponents/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaRocket, FaShieldAlt, FaUsers, FaLightbulb } from "react-icons/fa";

const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "50+", label: "Happy Clients" },
    { number: "100+", label: "Projects Delivered" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
            <FaRocket className="w-4 h-4 mr-2" />
            Transforming Businesses Digitally
          </div>
          
          {/* Main Headlines */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Bring_Your_Business_Online")}
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
            {t("With")} <span className="font-bold">ONRTECH</span>
          </h2>
          
          {/* Typed Animation */}
          <div className="mb-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              {t("Elevating_businesses")}
            </h3>
            <ReactTyped
              className="text-4xl lg:text-5xl text-blue-600 dark:text-blue-400 font-bold"
              strings={[
                t("Mobile_Innovation") || "Mobile Innovation",
                t("Web_Excellence") || "Web Excellence", 
                t("AI_Empowerment") || "AI Empowerment",
              ]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </div>
          
          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("We_Help_You_Build")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to={"/about"}>
              <Button
                visibility="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                value={t("Contact_us")}
              />
            </Link>
            <Link to={"/services"}>
              <button className="inline-flex items-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <span className="mr-2">Our Services</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Trusted by businesses worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="h-6 w-6 text-green-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUsers className="h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Expert Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaLightbulb className="h-6 w-6 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Innovative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
