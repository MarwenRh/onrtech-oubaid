type Props = {
  descr: string;
  logo: string;
};

const SingleClient = ({ logo, descr }: Props) => {
  return (
    <div className="w-10/12 mx-auto flex flex-col items-center justify-center m-2 text-center bg-gray-100 hover:bg-blue-50 rounded-3xl p-2 lg:flex lg:basis-1/4 lg:mx-4 lg:w-48 lg:h-32 dark:bg-slate-500">
      <img
        src={logo}
        className="rounded-3xl text-center"
        alt="Microsoft"
        width={78}
        height={50}
      ></img>
      <p className="dark:text-white">{descr}</p>
    </div>
  );
};

export default SingleClient;
