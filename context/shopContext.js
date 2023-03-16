import { createContext, useState, useEffect } from "react";
import {
  createCheckout,
  getHeaderContent,
  updateCheckout,
} from "../lib/shopify";

const ShopContext = createContext();

export default function ShopProvider({ children }) {
  // cart

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    sendHeaderContentRequest();
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id);
      if (cartObject[0].id) {
        setCart([cartObject[0]]);
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]]);
      }

      setCheckoutId(cartObject[1].id);
      setCheckoutUrl(cartObject[1].webUrl);
    }
  }, []);

  async function addToCart(newItem) {
    if (cart.length === 0) {
      setCart([newItem]);
      const checkout = await createCheckout(
        newItem.variantId,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      let newCart = [];
      let added = false;

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++;
          newCart = [...cart];
          added = true;
        }
      });

      if (!added) {
        newCart = [...cart, newItem];
      }

      setCart(newCart);
      const newCheckout = await updateCheckout(checkoutId, newCart);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify([newCart, newCheckout])
      );
    }
  }

  // header
  const [headerContent, setHeaderContent] = useState({
    logo: "https://cdn.shopify.com/s/files/1/2481/5934/files/RELIKEDLOGO_360x.png?v=1657015784",
    bannerText: "",
    bannerBackroundColour: "",
    bannerBackgroundImagePattern: "",
  });

  function updateHeaderContentValue(
    value,
    label,
    value1,
    label1,
    value2,
    label2,
    value3,
    label3
  ) {
    headerContent[label] = value;
    headerContent[label1] = value1;
    headerContent[label2] = value2;
    headerContent[label3] = value3;
    return value;
  }

  async function sendHeaderContentRequest() {
    // doesn't work on first page render
    const headerContentRequest = await getHeaderContent(
      "gid://shopify/Metaobject/57180350"
    );

    updateHeaderContentValue(
      headerContentRequest.metaobject.logo.value,
      "logo"
    );
  }

  return (
    <ShopContext.Provider
      value={{
        headerContent,
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
