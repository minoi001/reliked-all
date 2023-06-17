import { createContext, useEffect, useState } from "react";
import {
  createCheckout,
  getHeaderContent,
  getNavigation,
  updateCheckout,
} from "../lib/shopify";

const ShopContext = createContext();

export default function ShopProvider({ children }) {
  // cart

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    sendHeaderContentRequest();
    sendNavigationRequest();
    sendHomepageContentRequest();
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

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove);
    setCartLoading(true);

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

    localStorage.setItem(
      "checkout_id",
      JSON.stringify([updatedCart, newCheckout])
    );
    setCartLoading(false);

    if (cart.length === 1) {
      setCartOpen(false);
    }
  }

  // header
  const [headerContent, setHeaderContent] = useState({
    logo: "https://cdn.shopify.com/s/files/1/2481/5934/files/RELIKEDLOGO_360x.png?v=1657015784",
    bannerText: "",
    bannerBackroundColour: "",
    bannerBackgroundImagePattern: "",
  });

  function updateHeaderContentValue(valuesObject) {
    // console.log(valuesObject);
    setHeaderContent({ ...headerContent, ...valuesObject });

    // for (let value in valuesObject) {
    //   console.log(valuesObject[value]);
    // }

    return valuesObject;
  }

  async function sendHeaderContentRequest() {
    // doesn't work on first page render
    const headerContentRequest = await getHeaderContent(
      "gid://shopify/Metaobject/57180350"
    );

    updateHeaderContentValue({
      logo: `${headerContentRequest.metaobject.logo.value}`,
    });
  }

  // homepage
  const [homepageContent, setHomepageContent] = useState({
    heroImage: "",
    heroImageMobile: "",
  });

  function updateHomepageContentValue(valuesObject) {
    // console.log(valuesObject);
    setHomepageContent({ ...homepageContent, ...valuesObject });

    // for (let value in valuesObject) {
    //   console.log(valuesObject[value]);
    // }

    return valuesObject;
  }

  let [collection1, setcollection1] = useState({
    title: "",
    handle: "",
    href: "",
  });

  async function sendHomepageContentRequest() {
    // doesn't work on first page render
    // const homepageContentRequest = await getHomepageContent(
    //   "gid://shopify/Metaobject/57147582"
    // ).then((collection1 = await getCollection()));

    setcollection1(collection1);
  }

  const [navigation, setNavigation] = useState({});

  async function sendNavigationRequest() {
    // doesn't work on first page render
    const navigationRequest = await getNavigation().then();

    setNavigation(navigationRequest);
  }

  return (
    <ShopContext.Provider
      value={{
        headerContent,
        homepageContent,
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        navigation,
        removeCartItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
