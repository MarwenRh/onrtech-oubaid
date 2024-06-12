import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";

export const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg">
        <img src={loaderImg} alt="Loading..." className="w-12 h-12" />
      </div>
    </div>,
    document.getElementById("loader")!
  );
};
export const Spinner = () => {
  return (
    <div>
      <div className="bg-white dark:bg-slate-900 p-5 rounded-lg">
        <img src={loaderImg} alt="Loading..." className="w-4 h-4" />
      </div>
    </div>
  );
};
