import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive IT consulting services including web development, cloud engineering, software architecture, digital transformation, and technical support. Our team specializes in modern technologies and best practices."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity and scope. Simple websites typically take 2-4 weeks, while complex enterprise applications can take 3-6 months. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you work with international clients?",
      answer: "Yes! While we're based in France, we work with clients globally. We're experienced in remote collaboration and can accommodate different time zones. Our team is fluent in English and French."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in modern web technologies including React, Node.js, Python, cloud platforms (AWS, Azure, GCP), databases (MongoDB, PostgreSQL), and DevOps practices. We stay current with the latest industry trends."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Absolutely! We offer comprehensive support packages including maintenance, updates, monitoring, and technical assistance. Our support plans are tailored to your specific needs and budget."
    },
    {
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices including code reviews, automated testing, continuous integration, and regular client check-ins. Our team has extensive experience and we're committed to delivering high-quality solutions."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Got Questions? We Have Answers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our services, processes, and how we can help your business grow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <FaChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
