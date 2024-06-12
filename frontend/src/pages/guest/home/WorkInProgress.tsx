const WorkInProgress = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen dark:bg-slate-900 ">
      <div className="text-center">
        <svg
          className="mx-auto mb-4 w-16 h-16 text-blue-700 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v4m0 8v4m8-8h-4M4 12H4m16 0a8 8 0 11-8-8v0a8 8 0 010 16z"
          />
        </svg>
        <h1 className="text-3xl font-semibold text-gray-700">
          Work in Progress
        </h1>
        <p className="mt-2 text-gray-600">
          We're working hard to bring you the best experience. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default WorkInProgress;
