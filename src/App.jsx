import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CurrentNews from "./pages/CurrentNews";
import NewsDetail from "./pages/NewsDetail";
import Archives from "./pages/Archives";
import ThingalUdhayam from "./pages/ThingalUdhayam";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddNews from "./pages/AddNews";

/* Scrolls to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current-news" element={<CurrentNews />} />
        <Route path="/current-news/:id" element={<NewsDetail />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/thingal-udhayam" element={<ThingalUdhayam />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-news" element={<AddNews />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
