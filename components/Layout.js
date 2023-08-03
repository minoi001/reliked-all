import { useRouter } from "next/router";
import Footer from "./Footer";
import MegaMenu from "./Header/MegaMenu";
import Banner from "./Header/Banner";
import ShoppingSubheader from "./Header/ShoppingSubheader";
import LogoHeader from "./Header/LogoHeader";

export default function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="bg-offWhite flex flex-col">
      <header>
        <Banner />
        <LogoHeader />
      </header>

      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
