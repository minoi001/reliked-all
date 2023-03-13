import "../styles/globals.css";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import ProductProvider from "../context/productContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div>
      <title>Reliked Headless Demo Store</title>
      <ShopProvider>
        <ProductProvider>
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </ProductProvider>
      </ShopProvider>
    </div>
  );
}

export default MyApp;
