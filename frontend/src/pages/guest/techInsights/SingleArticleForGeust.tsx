import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/loader/Loader";
import { article } from "../../../types/types";
import { formatDate } from "../../../utils/fomatDate";
import { Helmet } from "react-helmet-async";

const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

const SingleArticleForGeust = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<article>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/articles/${id}`);
        setArticle(resp.data);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Helmet>
        <title>{article?.seoTitle || article?.title || "Article"}</title>
        <meta name="description" content={article?.seoDescription || article?.summary || "Read this article on our tech insights blog"} />
        <meta property="og:title" content={article?.seoTitle || article?.title || "Article"} />
        <meta property="og:description" content={article?.seoDescription || article?.summary || "Read this article on our tech insights blog"} />
        <meta property="og:image" content={article?.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.seoTitle || article?.title || "Article"} />
        <meta name="twitter:description" content={article?.seoDescription || article?.summary || "Read this article on our tech insights blog"} />
        <meta name="twitter:image" content={article?.image} />
        <meta name="author" content={article?.author} />
        <meta name="article:published_time" content={article?.publishedAt} />
        <meta name="article:author" content={article?.author} />
        {article?.tags && article.tags.map((tag, index) => (
          <meta key={index} name="article:tag" content={tag} />
        ))}
      </Helmet>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : (
        <article className="mx-auto max-w-3xl lg:max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {article?.title}
            </h1>

            <div className="mt-3 flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center text-xs font-semibold">
                {article?.author?.slice(0, 1) || "A"}
              </div>
              <span className="font-medium">{article?.author}</span>
              <span aria-hidden="true">•</span>
              <time>{formatDate(article?.publishedAt)}</time>
              {article?.readTimeMinutes ? (
                <>
                  <span aria-hidden="true">•</span>
                  <span>{article.readTimeMinutes} min read</span>
                </>
              ) : null}
            </div>

            {article?.summary ? (
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                {article.summary}
              </p>
            ) : null}
          </header>

          <figure className="mt-8 overflow-hidden rounded-2xl ring-1 ring-gray-200/70 dark:ring-white/10">
            <img
              src={article?.image}
              alt={article?.title}
              className="w-full h-80 object-cover"
            />
          </figure>

          <section className="prose prose-lg dark:prose-invert max-w-none mt-8 leading-relaxed">
            <div
              className="text-gray-800 dark:text-gray-100"
              dangerouslySetInnerHTML={{ __html: article?.contentHtml  || "" }}
            />
            {article?.tags && article.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </section>
        </article>
      )}
    </div>
  );
};

export default SingleArticleForGeust;