import { useTranslation } from "react-i18next";
import { FaClipboardQuestion } from "react-icons/fa6";
import SingleQuestion from "./SingleQuestion";

const QuestionsList = () => {
  const { t } = useTranslation();
  const faqData = [
    {
      question: t("question1"),
      answer: t("answer1"),
    },
    {
      question: t("question2"),
      answer: t("answer2"),
    },
    {
      question: t("question3"),
      answer: t("answer3"),
    },
    {
      question: t("question4"),
      answer: t("answer4"),
    },
    {
      question: t("question5"),
      answer: t("answer5"),
    },
  ];

  return (
    <section className="mt-6 pb-10 w-11/12 md:w-2/3 text-center p-8 bg-blue-50 mx-auto rounded-md dark:bg-slate-500  dark:shadow-lg dark:shadow-blue-500 ">
      <div className="mb-8 mt-8 flex justify-center items-center">
        <FaClipboardQuestion className="text-4xl text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300">
          Your Questions Answered
        </h1>
      </div>
      <div>
        {faqData.map((faq, index) => {
          return (
            <SingleQuestion
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          );
        })}
      </div>
    </section>
  );
};
export default QuestionsList;
