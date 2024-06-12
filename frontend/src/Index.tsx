import { Outlet } from "react-router-dom";
import Navbar from "./components/reusableComponents/Navbar";
import Footer from "./components/reusableComponents/Footer";

const Index = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Index;
