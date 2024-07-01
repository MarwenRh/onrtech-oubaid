// OfferCard.js

import { MdPlace } from "react-icons/md";
import { JobOffer } from "../../../types/types";
import { Link } from "react-router-dom";
import { cutContent, cutTitle } from "../../../utils/cutText";
import { formatDate } from "../../../utils/fomatDate";
type Props = {
  offer: JobOffer;
};

const OfferCard = ({ offer }: Props) => {
  return (
    <div className="bg-gray-50 m-4 rounded-lg shadow-lg p-6  hover:bg-gray-100 hover:shadow-blue-300 dark:bg-gray-200 border-gray-200 border w-[400px] h-[500px] relative sm:w-80 sm:h-[370px] md:w-96 md:h-[390px] ">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div>
            <h1 className="text-xl font-semibold text-blue-400 dark:text-cyan">
              {cutTitle(offer.title)}
            </h1>
          </div>

          <div className="p-2 text-gray-400 flex flex-col">
            <MdPlace className="text-gray-600 text-center flex flex-row justify-center items-center w-1/3 dark:text-black" />
            <p className="dark:text-black">{offer.locationType}</p>
          </div>
        </div>
        <div className="text-gray-400 dark:text-gray-500">
          {formatDate(offer.publishedAt)}
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-4" />
      <div>
        <p className="text-gray-700 mb-4 dark:text-gray-800  ">
          {cutContent(offer.description)}
        </p>
        <p className="text-violet-400  dark:text-violet-700">
          Contract Type: {offer.contractType}
        </p>
      </div>
      {/* apply button */}

      <div className="mt-4 mx-auto text-center">
        <div className="absolute  w-11/12 right-4 top-[440px]  md:top-[330px]">
          <button className="bg-white hover:bg-blue-500 hover:text-white w-2/3 text-gray-800 px-4 py-2 rounded-md border border-gray-300 shadow-lg shadow-gray-400 hover:shadow-lg hover:-translate-y-1">
            <Link to={`/offerApplication/${offer._id}`}>Apply Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
