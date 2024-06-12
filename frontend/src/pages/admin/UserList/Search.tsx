import React from "react";
import { BiSearch } from "react-icons/bi";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-xl relative">
      <BiSearch size={20} className="absolute left-3 top-3 text-primary" />
      <input
        className=" w-full px-20 py-2.5 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-blue50
        focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="search"
        type="text"
        placeholder="Search Users..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
