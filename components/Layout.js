import MegaMenu from "./MegaMenu";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <MegaMenu />
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
