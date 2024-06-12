type Props = {
  title: string;
  descr: string;
  Icon: React.ElementType;
};
const SingleService = ({ Icon, descr, title }: Props) => {
  return (
    <div className="mt-8 flex flex-col justify-center items-center bg-blue-50 rounded-2xl p-8 hover:bg-blue-100 hover:shadow-xl hover:shadow-blue-300 lg:mx-4 lg:w-[450px] lg:h-[450px] dark:bg-slate-400 ">
      <Icon size={38} className="my-4 text-blue-500 dark:text-blue-800" />
      <h2 className="text-3xl font-normal text-teal-600 dark:text-cyan">
        {title}
      </h2>
      <p className="text-center text-lg mt-4 text-gray-500 dark:text-gray-50">
        {descr}
      </p>
    </div>
  );
};
export default SingleService;
