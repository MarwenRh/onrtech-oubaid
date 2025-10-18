import { useTranslation } from "react-i18next";
import { FaRocket, FaShieldAlt, FaUsers, FaLightbulb } from "react-icons/fa";

const Hero = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaRocket className="h-6 w-6" />,
      title: t("adj1") || "Innovative",
      description: "Cutting-edge solutions"
    },
    {
      icon: <FaShieldAlt className="h-6 w-6" />,
      title: t("adj2") || "Reliable",
      description: "Enterprise-grade security"
    },
    {
      icon: <FaUsers className="h-6 w-6" />,
      title: t("adj3") || "Collaborative",
      description: "Expert team support"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
            <FaLightbulb className="w-4 h-4 mr-2" />
            Professional IT Services
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("services")}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("services_Intro")}
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <span className="mr-2">Let's discuss your project</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
