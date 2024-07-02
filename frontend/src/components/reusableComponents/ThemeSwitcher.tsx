import { useEffect, useState } from "react";
import { AiOutlineSun, AiOutlineMoon, AiOutlineDesktop } from "react-icons/ai";
type Props = {
  style: string;
};
const ThemeSwitcher = ({ style }: Props) => {
  const element = document.documentElement;
  // set the theme state based on the local storage else set it to system
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };
  onWindowMatch();
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);
  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  const options = [
    { icon: AiOutlineSun, text: "light" },
    { icon: AiOutlineMoon, text: "dark" },
    { icon: AiOutlineDesktop, text: "system" },
  ];
  return (
    <div className={style}>
      {options.map((opt) => (
        <button
          key={opt.text}
          className={`bg-blue-50 m-1.5 rounded-full p-1.5  dark:bg-blue-100  duration-100  ${
            theme === opt.text && "text-blue-700"
          }`}
          onClick={() => setTheme(opt.text)}
        >
          <opt.icon size={22} />
        </button>
      ))}
    </div>
  );
};
export default ThemeSwitcher;
