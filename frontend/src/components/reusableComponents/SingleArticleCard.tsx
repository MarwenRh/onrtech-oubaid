import { Link } from "react-router-dom";
import { formatDate } from "../../utils/fomatDate";
import { cutContent, cutTitle } from "../../utils/cutText";
import { article } from "../../types/types";
type Prop = {
  article: article;
  style: string;
};

const SingleArticleCard = ({ article, style }: Prop) => {
  return (
    <div
      className={` dark:bg-slate-500 h-[650px] w-[365px]  md:h-[570px] md:w-[365px] m-5 bg-white shadow-md rounded-lg ${style} relative`}
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h1 className="dark:text-white text-2xl font-bold mb-4 ">
          {cutTitle(article.title)}
        </h1>

        <div className="flex space-x-2 mb-4">
          <span className="text-gray-400 font-bold dark:text-blue-800">
            {article.author}
          </span>
        </div>

        <p className="text-gray-700 dark:text-white">
          {cutContent(article.content)}
        </p>

        {/* {article.content.length > maxContentLength && ( */}
        <div className="mt-4">
          <p className="text-gray-500 font-semibold dark:text-blue-800 absolute top-[540px] md:top-[500px]">
            Published on {formatDate(article.publishedAt)}
          </p>
        </div>
        {/* // )} */}
        <Link
          to={`/singleArticleForGeust/${article._id}`}
          className=" dark:text-green-400 font-bold text-teal-700 hover:underline absolute top-[600px] md:top-[530px]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default SingleArticleCard;
