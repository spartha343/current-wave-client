import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import SearchNews from "../../components/searchNews/SearchNews";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <SearchNews />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
