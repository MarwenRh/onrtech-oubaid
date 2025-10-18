import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import SingleArticleCard from "../../../components/reusableComponents/SingleArticleCard";
import ReactPaginate from "react-paginate";
import { TiDelete } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { article } from "../../../types/types";

const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl bg-white dark:bg-slate-700/60 ring-1 ring-gray-200/70 dark:ring-white/10">
    <div className="h-48 w-full rounded-t-xl bg-gray-200 dark:bg-slate-600" />
    <div className="p-5 space-y-3">
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate-600 rounded" />
      <div className="h-4 w-full bg-gray-200 dark:bg-slate-600 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-600 rounded" />
      <div className="h-9 w-28 bg-gray-200 dark:bg-slate-600 rounded" />
    </div>
  </div>
);

const ArticlesList = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPublishedArticles = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/articles/published`);
        setArticles(resp.data.PublishedArticles);
      } catch (error) {
        console.log(error);
        toast.error("We hit an error please try again later");
      } finally {
        setLoading(false);
      }
    };
    getPublishedArticles();
  }, []);

  // Debounced search
  const [debounced, setDebounced] = useState(search);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(id);
  }, [search]);

  const filteredArticles = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => {
      const plain = (a.contentHtml || "").replace(/<[^>]+>/g, " ");
      return `${a.title} ${a.summary ?? ""} ${plain} ${a.author}`.toLowerCase().includes(q);
    });
  }, [articles, debounced]);

  // Pagination
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredArticles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredArticles.length / itemsPerPage);
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredArticles.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mx-auto w-full md:w-9/12 lg:w-7/12">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 px-4 py-2 shadow-sm">
          <FaSearch size={18} className="text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            placeholder={t("searchPlaceholder")}
            aria-label="Search articles"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <TiDelete size={22} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-900/30 grid place-items-center">
              <span className="text-2xl">🧐</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              No articles match your search
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Try a different keyword or clear the search.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, index) => (
              <SingleArticleCard
                key={index}
                article={item}
                style="hover:-translate-y-1.5 duration-300"
              />
            ))}
          </div>
        )}
      </div>

      {filteredArticles.length > itemsPerPage && (
        <div className="mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel={t("paginationNext")}
            previousLabel={t("paginationPrevious")}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-center gap-2"
            pageLinkClassName="px-3 py-2 text-sm leading-tight text-blue-700 bg-white rounded-md border border-blue-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-300 dark:border-white/10"
            previousLinkClassName="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            nextLinkClassName="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            breakLinkClassName="px-3 py-2 text-sm text-blue-700 bg-white rounded-md border border-blue-200 dark:bg-slate-800 dark:text-blue-300 dark:border-white/10"
            activeLinkClassName="ring-2 ring-blue-500"
          />
        </div>
      )}
    </section>
  );
};

export default ArticlesList;