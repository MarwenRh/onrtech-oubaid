import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { review } from "../../../types/types";
type Props = {
  review: review;
};

const TestimonialCard = ({ review }: Props) => {
  return (
    <div className="flex flex-col items-center relative ">
      <div className="absolute top-[-7rem] z-[10] mx-auto">
        <div className="relative">
          <img
            className="aspect-square rounded-full w-[140px] h-[140px] z-[25]"
            src={review.image}
            alt={review.name}
          />
          <div
            className="w-[140px] h-[140px] bg-blue-200 rounded-full absolute
           top-[-6px] z-[-10] left-[10px] dark:bg-blue-400"
          ></div>
        </div>
      </div>

      <div className="text-center mt-7">
        <p className="tracking-wider font-bold text-2xl capitalize">
          {review.name}
        </p>
        <p className="text-violet-300 uppercase text-sm dark:text-violet-700">
          {review.job}
        </p>
      </div>

      <div className="text-violet-400 mx-auto mt-5 dark:text-violet-700 ">
        <FaQuoteLeft />
      </div>

      <div className="text-center mt-4 text-slate-500">{review.text}</div>

      <div className="text-violet-400 mx-auto mt-5 dark:text-violet-700">
        <FaQuoteRight />
      </div>
    </div>
  );
};

export default TestimonialCard;
