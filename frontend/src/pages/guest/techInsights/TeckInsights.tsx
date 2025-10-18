import ArticlesList from "./ArticlesList";

const TeckInsights = () => {
  return (
    <div className="dark:bg-slate-900 dark:text-gray-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/15 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/40 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-200/50">
              Tech Insights
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Fresh perspectives, practical guides, and engineering stories
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Explore curated articles covering modern web, cloud, and product engineering.
            </p>
          </div>
        </div>
      </section>

      <ArticlesList />
    </div>
  );
};
export default TeckInsights;