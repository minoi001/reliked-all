import { useRouter } from "next/router";
import Footer from "./Footer";
import Banner from "./Header/Banner";
import LogoHeader from "./Header/LogoHeader";
import { GoogleAnalytics } from "./GoogleAnalytics";
import CookieBanner from "./CookieBanner";

export default function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-col">
      <GoogleAnalytics />
      <div className="bg-offWhite">
        <header className="mb-2">
          <Banner />
          <LogoHeader />
        </header>
      </div>
      <main>{children}</main>
      <CookieBanner />
      <div className="bg-taupe mt-12">
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
