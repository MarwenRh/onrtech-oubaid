import { Outlet } from "react-router-dom";
import Navbar from "./components/reusableComponents/Navbar";
import Footer from "./components/reusableComponents/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Index;
