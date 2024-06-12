import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className="min-h-[88vh] ">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
