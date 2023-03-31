import { useRouter } from "next/router";
import Footer from "./Footer";
import MegaMenu from "./MegaMenu";

export default function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="bg-offWhite">
      <header>
        <MegaMenu />
      </header>
      {pathname?.includes("/selling") ? (
        <subheader>selling subheader</subheader>
      ) : (
        <subheader>shopping subheader</subheader>
      )}

      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
