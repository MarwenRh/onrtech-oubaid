import CountryFlag from "./CountryFlag";
type props = {
  code: string;
  country: string;
};

const LanguageBtn = ({ code, country }: props) => {
  return (
    <button
      type="button"
      className="inline-flex items-center font-medium justify-center px-4 py-1 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-500 dark:hover:text-white"
    >
      <CountryFlag code={code} />
      {country}
    </button>
  );
};
export default LanguageBtn;
