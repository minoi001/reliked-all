import { useRouter } from "next/router";
import Footer from "./Footer";
import Banner from "./Header/Banner";
import LogoHeader from "./Header/LogoHeader";

export default function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-col">
      <div className="bg-offWhite">
        <header>
          <Banner />
          <LogoHeader />
        </header>
      </div>
      <main>{children}</main>
      <div className="bg-taupe">
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
