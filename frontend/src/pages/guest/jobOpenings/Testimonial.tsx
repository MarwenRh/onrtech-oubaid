import { MdRateReview } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import reviews from "../../../dummyData/reviews.json";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  function leftShiftHandler() {
    if (index - 1 < 0) {
      setIndex(reviews.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function rightShiftHandler() {
    if (index + 1 >= reviews.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <div className="mt-10">
      <div className="flex flex-row items-center justify-center ">
        <MdRateReview size={35} className="text-blue-500 dark:text-blue-300 " />
        <h1 className="ml-4 text-4xl font-bold text-center dark:text-white">
          Our Testimonials
        </h1>
      </div>

      <div className="pt-10 mt-10  flex flex-col items-center justify-between">
        <div
          className="w-[85vw] md:w-[700px] h-full bg-white flex flex-col justify-center items-center
    mt-10 p-10 transition-all duration-700 hover:shadow-xl rounded-md mx-auto dark:bg-gray-200"
        >
          <TestimonialCard review={reviews[index]}></TestimonialCard>

          <div className="flex text-3xl mt-10 gap-3 text-violet-400 font-bold mx-auto">
            <button
              onClick={leftShiftHandler}
              className="cursor-pointer hover:text-violet-500 dark:text-violet-700 "
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={rightShiftHandler}
              className="cursor-pointer hover:text-violet-500 dark:text-violet-700 "
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
