import { LiaHandsHelpingSolid } from "react-icons/lia";
import { FaDesktop, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { TbDeviceMobileCode } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const ServicesList = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: FaDesktop,
      title: t("serviceTitle1") || "Web Development",
      descr: t("serviceDescrip1") || "Custom web applications and websites built with modern technologies",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Development"]
    },
    {
      icon: TbDeviceMobileCode,
      title: t("serviceTitle2") || "Mobile Development",
      descr: t("serviceDescrip2") || "Cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "Native Development", "App Store Deployment"]
    },
    {
      icon: GiArtificialIntelligence,
      title: t("serviceTitle3") || "AI Solutions",
      descr: t("serviceDescrip3") || "Intelligent automation and AI-powered business solutions",
      features: ["Machine Learning", "Data Analytics", "Process Automation", "AI Integration"]
    },
  ];

  return (
    <div className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
            <LiaHandsHelpingSolid className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("our_service")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {service.descr}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span className="mr-2">Learn More</span>
                <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business and achieve your goals.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <span className="mr-2">Get Started Today</span>
              <FaArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesList;
