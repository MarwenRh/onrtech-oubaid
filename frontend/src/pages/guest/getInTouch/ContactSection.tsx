import { ContactPage } from "./ContactPage";
import { FaPhoneAlt, FaClock, FaHeadset, FaShieldAlt } from "react-icons/fa";
import ContactDetail from "./ContactDetail";
import { BiWorld } from "react-icons/bi";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <BiWorld className="h-6 w-6" />,
      title: "Country",
      text: "France",
      description: "Serving clients globally"
    },
    {
      icon: <MdLocationOn className="h-6 w-6" />,
      title: "Location",
      text: "Villiers Sur Marne",
      description: "Paris Region, France"
    },
    {
      icon: <FaPhoneAlt className="h-6 w-6" />,
      title: "Phone",
      text: "+33 7 50 21 83 96",
      description: "Mon-Fri 9AM-6PM CET"
    },
    {
      icon: <MdEmail className="h-6 w-6" />,
      title: "Email",
      text: "contact@onrtech.fr",
      description: "We'll respond within 24h"
    }
  ];

  const supportFeatures = [
    {
      icon: <FaHeadset className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for your projects"
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: "Secure Communication",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: <FaClock className="h-8 w-8" />,
      title: "Fast Response",
      description: "Quick turnaround times for all inquiries"
    }
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {info.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {info.title}
                  </h3>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {info.text}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {info.description}
              </p>
            </div>
          ))}
        </div>

        {/* Support Features */}
        <div className="bg-white dark:bg-slate-700 rounded-2xl p-8 mb-16 shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Support?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing exceptional service and support for all your technology needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white">
              Send us a Message
            </h2>
            <p className="text-blue-100 mt-2">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="p-8">
            <ContactPage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactSection;
