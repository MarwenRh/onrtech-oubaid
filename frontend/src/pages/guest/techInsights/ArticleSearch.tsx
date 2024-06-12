import { TiDelete } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
const ArticleSearch = () => {
  return (
    <div className="mt-10 pb-20 ">
      <div className="mx-auto w-10/12 bg-gray-100 rounded-lg lg:h-52 h-96 t-2 flex flex-col justify-center">
        <div className="w-10/12 lg:h-2/5 h-full mt-3 mx-auto bg-white shadow-lg shadow-gray-500 rounded-xl flex lg:flex-row items-center justify-evenly flex-col ">
          <div className="flex l justify-evenly items-center flex-row p-2">
            <FaSearch
              size={28}
              className=" text-black dark:text-blue-700 mr-2"
            />
            <input
              type="text"
              className=" outline-none border-none w-full   pl-8 text-lg text-gray-900  rounded-lg bg-white dark:bg-gray-100 
         
        dark:placeholder-gray-900
         dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder:text-gray-500"
              placeholder={"search job ..."}
            />

            <TiDelete
              size={30}
              className="text-gray-400 hover:cursor-pointer hover:text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="category" className="mr-2 dark:text-gray-700">
              Filter by Category:
            </label>
            {/* <select id="category" onChange={handleChange}> */}
            <select
              id="category"
              className="py-1 px-21 rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="all">All</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-development">Mobile Development</option>
            </select>
          </div>
        </div>
        <div className="w-10/12 h-2/5 mt-3 mx-auto flex flex-col items-center justify-evenly lg:flex-row">
          <div className="flex items-center">
            <label htmlFor="sort-by" className="mr-2 dark:text-white">
              Sort by:
            </label>
            <select
              id="sort-by"
              className="border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Date</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSearch;
