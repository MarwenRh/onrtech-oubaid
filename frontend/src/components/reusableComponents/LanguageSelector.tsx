import { useEffect, useState } from "react";
import { GiWorld } from "react-icons/gi";
import { FaSortDown } from "react-icons/fa";
import i18n from "../../i18n/i18n";
import LangageBtn from "./LanguageBtn";

interface Language {
  code: string;
  name: string;
  country_code: string;
  dir?: string;
}

const LanguageSelector: React.FC = () => {
  const [visibility, setVisibility] = useState<"hidden" | "block">("hidden");

  const toggleVisibility = () => {
    setVisibility((prevVisibility) =>
      prevVisibility === "hidden" ? "block" : "hidden"
    );
  };

  const languages: Language[] = [
    {
      code: "fr",
      name: "français",
      country_code: "fr",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
    {
      code: "ar",
      name: "العربية",
      country_code: "sa",
      dir: "rtl",
    },
    {
      code: "zh",
      name: "中文",
      country_code: "cn",
      dir: "ltr",
    },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );

  const curtLng: Language | undefined = languages.find(
    (l) => l.code === currentLanguage
  );

  useEffect(() => {
    document.body.dir = curtLng?.dir || "ltr";
  }, [curtLng]);

  return (
    <div className="pt-1">
      <button onClick={toggleVisibility} className="flex flex-row">
        <GiWorld className="mr-2 text-blue-700 dark:text-blue-500" size={23} />
        <FaSortDown
          className="mr-2 text-blue-700 dark:text-blue-500"
          size={20}
        />
      </button>
      <div
        className={`${visibility} absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 z-50 top-10 mt-2`}
      >
        <ul className="py-2 font-medium" role="none">
          {languages.map(({ code, country_code, name }) => (
            <li
              key={code}
              className="py-1.5"
              onClick={() => {
                toggleVisibility();
                i18n.changeLanguage(code);
                setCurrentLanguage(code);
              }}
            >
              <LangageBtn code={country_code} country={name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
