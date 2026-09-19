import { Outlet } from "react-router-dom";

import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
