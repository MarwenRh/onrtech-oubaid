import { client } from "../../types/types";

const ClientCard = ({
  clientName,
  companyLogo,
  joinDate,
  description,
}: client) => {
  return (
    <div className="w-full h-full mx-auto bg-white rounded-xl shadow-md hover:shadow-lg dark:bg-slate-800">
      <img
        className="pt-2 h-20 w-28 bg-cover text-center border-solid mx-auto rounded-xl"
        src={companyLogo}
        alt={clientName}
      />

      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold dark:text-indigo-400">
          {clientName}
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-300">{description}</p>
        <div className="mt-4">
          <span className="text-gray-500 dark:text-gray-400">
            Began working with us on:{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {joinDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
