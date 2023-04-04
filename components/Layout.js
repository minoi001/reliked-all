import { useRouter } from "next/router";
import Footer from "./Footer";
import MegaMenu from "./MegaMenu";
import Banner from "./Header/Banner";
import ShoppingHeader from "./ShoppingHeader";
import LogoHeader from "./Header/LogoHeader";

export default function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="bg-offWhite">
      <header>
        <Banner />
        <LogoHeader />
      </header>
      {pathname?.includes("/selling") ? (
        <subheader>selling subheader</subheader>
      ) : (
        <subheader></subheader>
      )}

      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
