import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { article } from "../../../types/types";
import { formatDate } from "../../../utils/fomatDate";
import { Loader } from "../../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { Helmet } from "react-helmet-async";
const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
const ShowArticle = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<article>();
  const { id } = useParams();
  useEffect(() => {
    console.log(typeof id);
    const getArticle = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/articles/${id}`);
        setArticle(resp.data);
        setLoading(false);
      } catch (error) {
        toast.error("Errro when fetchin data please try again");
      }
    };
    getArticle();
  }, [id]);
  return (
    <div className="dark:bg-slate-900">
      <Helmet>
        <title>{article?.seoTitle || article?.title || "Article - Admin View"}</title>
        <meta name="description" content={article?.seoDescription || article?.summary || "Article preview"} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="dark:bg-slate-900">
          <div className="bg-gray-100 mx-auto w-8/12 p-4 rounded-lg lg:w-6/12 shadow-md hover:shadow-lg transition-shadow  dark:bg-slate-900 ">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                {article?.title}
              </h2>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center justify-between w-10/12  text-base text-gray-700 dark:text-white">
                <div>
                  <span className="mr-2 text-lg dark:text-blue-500">
                    Author:{" "}
                  </span>
                  {article?.author}
                </div>
                <div>
                  <span className=" mr-2 text-lg  dark:text-blue-500">
                    Published:{" "}
                  </span>
                  {formatDate(article?.publishedAt)}
                </div>
              </div>
            </div>
            <img
              src={article?.image}
              alt="Article"
              className="w-full rounded-md mt-4"
            />
            <section className="prose lg:prose-lg dark:prose-invert max-w-none mt-4">
              <div
                className="text-gray-800 dark:text-gray-100"
                dangerouslySetInnerHTML={{
                  __html:
                    (article?.contentHtml || "")
                      .replace(/&amp;/g, "&")
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">"),
                }}
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowArticle;
