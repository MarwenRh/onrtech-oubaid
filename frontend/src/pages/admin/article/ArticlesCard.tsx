import { articlesList } from "../../../types/types";
import ArticleSingleCard from "./ArticleSingleCard ";

const ArticlesCard = ({ articles }: articlesList) => {
  return (
    <div className="flex flex-wrap mx-auto justify-center">
      {articles.map((article, index) => (
        <ArticleSingleCard key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticlesCard;
