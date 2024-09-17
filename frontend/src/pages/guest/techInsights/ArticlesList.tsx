import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SingleArticleCard from "../../../components/reusableComponents/SingleArticleCard";
import { Loader } from "../../../components/loader/Loader";
import ReactPaginate from "react-paginate";
import { TiDelete } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { article } from "../../../types/types";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
const ArticlesList = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPublishedArticles = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/articles/published`);
        setArticles(resp.data.PublishedArticles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("We hit an error please try again later");
      }
    };
    getPublishedArticles();
  }, []);

  const filteredArticles = articles.filter((article: article) =>
    article.content.toLowerCase().includes(search.toLowerCase())
  );

  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredArticles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredArticles.length / itemsPerPage);
  // End Pagination

  // Invoke when user clicks to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredArticles.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="relative pt-4">
      <div className="py-2 mx-auto text-center w-8/12 ">
        <p className="text-gray-600 text-2xl dark:text-white">
          {t("welcomeMessage")}
        </p>
      </div>
      <div className="w-full md:w-8/12 mx-auto">
        <div className="flex justify-evenly items-center flex-row p-2">
          <FaSearch size={28} className="text-black dark:text-blue-700 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" border border-blue-100 outline-none py-2  w-full pl-8 text-lg text-gray-900 rounded-lg bg-white dark:bg-gray-100 dark:placeholder-gray-900 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder:text-gray-500"
            placeholder={t("searchPlaceholder")}
          />
          <TiDelete
            size={37}
            className="text-gray-400 hover:cursor-pointer hover:text-gray-800"
            onClick={() => setSearch("")}
          />
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <div className="h-full w-full mx-auto flex flex-wrap flex-row justify-evenly items-center mt-10">
              {currentItems.map((item, index) => (
                <SingleArticleCard
                  key={index}
                  article={item}
                  style="rounded-lg shrink shadow-lg shadow-blue-200 hover:-translate-y-3"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={t("paginationNext")}
        previousLabel={t("paginationPrevious")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center space-x-2"
        pageLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        previousLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-l hover:bg-blue-700"
        nextLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-r hover:bg-blue-700"
        breakLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        activeLinkClassName="py-2 px-3 leading-tight text-blue-900 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
      />
    </div>
  );
};

export default ArticlesList;
