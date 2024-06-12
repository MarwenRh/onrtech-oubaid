import { useState } from "react";

import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
type props = {
  question: string;
  answer: string;
};

const SingleQuestion = ({ question, answer }: props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div>
      <div className="bg-red rounded-md bg-white text-gray-800 text-md p-3 mx-auto mt-4 flex items-center justify-between">
        <div className="text-gray-800 font-bold"> {question}</div>
        {showAnswer ? (
          <button className="" onClick={() => setShowAnswer(false)}>
            <FaRegMinusSquare
              size={24}
              color="skyblue"
              className="hover:rotate-90 "
            />
          </button>
        ) : (
          <button className=" " onClick={() => setShowAnswer(true)}>
            <FaRegPlusSquare
              size={24}
              color="skyblue"
              className="hover:rotate-90 hover:to-blue-600"
            />
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="bg-gray-50 rounded-md outline outline-blue-200 p-3 mt-4 mx-auto text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
