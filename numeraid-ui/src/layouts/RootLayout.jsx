import { Outlet } from "react-router-dom";

import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
