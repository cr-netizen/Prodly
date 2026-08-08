import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink dark:bg-paper-night dark:text-ink-night">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
