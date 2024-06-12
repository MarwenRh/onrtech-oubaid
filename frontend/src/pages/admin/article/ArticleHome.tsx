import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { Loader } from "../../../components/loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import ArticlesCard from "./ArticlesCard";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BiEdit, BiInfoCircle, BiTrash } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";

const ArticleHome = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPublishedArticles = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:5000/api/articles/published"
        );
        setArticles(resp.data.PublishedArticles);
        setLoading(false);
        setCount(resp.data.count);
      } catch (error) {
        console.log(error);
        toast.error("We hit an error please try again later");
      }
    };
    getPublishedArticles();
  }, []);

  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = articles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(articles.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % articles.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4 dark:bg-slate-900">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row  justify-between items-center">
            <h1 className="text-3xl my-8 dark:text-gray-100">Articles List</h1>

            <Link to="/createArticle" className="mr-4">
              <div className="flex flex-col items-center justify-center">
                <MdOutlineAddBox className="text-sky-800 text-4xl dark:text-sky-400 " />
                <h2 className="text-sky-600 text-lg font-bold dark:text-sky-400 ">
                  {" "}
                  Add New Article
                </h2>
              </div>
            </Link>
            <Link to="/UnpublishedArticle" className="mr-4">
              <div className="flex flex-col items-center justify-center p-4">
                <CgSandClock className="text-sky-800 text-4xl dark:text-sky-400" />
                <h2 className="text-sky-600 text-lg font-bold dark:text-sky-400">
                  {" "}
                  Awaiting Approval
                </h2>
              </div>
            </Link>
          </div>
          <div className="w-9/12 mx-auto text-center mb-8">
            <p className=" dark:text-gray-100 text-xl text-gray-900 mt-4">
              <span className=" text-blue-600 text-2xl font-bold ">
                Administrator Notice:
              </span>{" "}
              You are currently overseeing{" "}
              <span className="font-semibold">{count} published articles</span>{" "}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center mt-4 ">
              <div className="mr-3">
                <FaChartLine size={50} className="text-cyan-700" />
              </div>
              <div className="ml-3">
                <div className="text-gray-700 text-xl   dark:text-gray-100">
                  Keep your readers engaged and informed by publishing fresh
                  content regularly.
                </div>
                <div className="text-gray-700 text-xl bg dark:text-gray-100">
                  New articles help drive traffic and build your online
                  presence.
                </div>
                <div className="text-gray-700 text-xl   dark:text-gray-100">
                  Quality articles position your company as a thought leader in
                  the industry.
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center">
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiInfoCircle size={32} color="blue" />
                <div className="px-1 text-gray-600 text-lg dark:text-gray-100">
                  to dive into Article details
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiTrash size={32} color="red" />
                <div className="px-1 text-gray-600 text-lg dark:text-gray-100">
                  to remove an <article></article>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiEdit size={32} color="yellow" />
                <p className="px-1 text-gray-600 text-lg dark:text-gray-100">
                  to tweak an article
                </p>
              </div>
            </div>
          </div>
          <div>
            <ArticlesCard articles={currentItems} />
          </div>
        </>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        // Tailwind CSS classes
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

export default ArticleHome;
