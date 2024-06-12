import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/loader/Loader";
import { BiCheckCircle, BiEdit, BiInfoCircle, BiTrash } from "react-icons/bi";
import ArticlesCard from "./ArticlesCard";

import ReactPaginate from "react-paginate";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";

const UnpublishedArticle = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState();
  const [unpublishedArticles, setUnpublishedArticles] = useState([]);
  useEffect(() => {
    const getUnpublished = async () => {
      const resp = await axios(
        "http://localhost:5000/api/articles/unPublished"
      );
      console.log(resp.data);
      setCount(resp.data.count);
      setUnpublishedArticles(resp.data.UnpublishedArticles);
      setLoading(false);
    };
    getUnpublished();
  }, []);
  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = unpublishedArticles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(unpublishedArticles.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % unpublishedArticles.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl my-8">Articles List</h1>

          <div className="w-9/12 mx-auto text-center mb-8">
            <p className="text-xl text-gray-900 mt-4">
              <span className=" text-blue-600 text-2xl font-bold">
                Administrator Notice:
              </span>{" "}
              You are currently overseeing{" "}
              <span className="font-semibold ">
                {count} article that waits for your Approval
              </span>{" "}
            </p>

            <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center">
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiInfoCircle size={32} color="blue" />
                <div className="px-1 text-gray-600 text-lg">
                  to dive into Article details
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiTrash size={32} color="red" />
                <div className="px-1 text-gray-600 text-lg">
                  to remove an article <article></article>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiEdit size={32} color="yellow" />
                <p className="px-1 text-gray-600 text-lg">
                  to tweak an article
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiCheckCircle size={32} color="green" />
                <p className="px-1 text-gray-600 text-lg">
                  to approve an article
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

export default UnpublishedArticle;
