import { createContext, useEffect, useState } from "react";
import {
  createCheckout,
  getHeaderContent,
  getHomepageContent,
  getNavigation,
  getFooterNav,
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
    sendFooterNavRequest();
    sendHomepageContentRequest();
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id);
      if (cartObject[0]?.id) {
        setCart([cartObject[0]]);
      } else if (cartObject[0]?.length > 0) {
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
    setHeaderContent({ ...headerContent, ...valuesObject });

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
    featured_influencers: "",
  });

  function updateHomepageContentValue(valuesObject) {
    setHomepageContent({ ...homepageContent, ...valuesObject });

    return valuesObject;
  }

  let [collection1, setcollection1] = useState({
    title: "",
    handle: "",
    href: "",
  });

  async function sendHomepageContentRequest() {
    // doesn't work on first page render
    const homepageContentRequest = await getHomepageContent(
      "gid://shopify/Metaobject/57147582"
    );

    updateHomepageContentValue(homepageContentRequest);
  }

  const [navigation, setNavigation] = useState({});

  async function sendNavigationRequest() {
    // doesn't work on first page render
    const navigationRequest = await getNavigation().then();
    const newArr1 = navigationRequest.items.map((v) => ({
      ...v,
      hidden: true,
    }));

    for (let category in newArr1) {
      for (let subcategory in newArr1[category].items) {
        newArr1[category].items[subcategory].hidden = true;
      }
    }

    const nav = { items: newArr1 };
    setNavigation(nav);
    // setNavigation(navigationRequest);
  }

  function resetMenuVisibility() {
    const newArr1 = navigation.items.map((v) => ({
      ...v,
      hidden: true,
    }));

    for (let category in newArr1) {
      for (let subcategory in newArr1[category].items) {
        newArr1[category].items[subcategory].hidden = true;
      }
    }

    const nav = { items: newArr1 };
    setNavigation(nav);
  }

  function navItemVisible(item, value) {
    let newNav = navigation;
    let itemObject = navigation.items[item];
    itemObject.hidden = value;
    newNav.items.splice(item, 1, itemObject);
    setNavigation(newNav);
  }

  function navSubItemVisible(category, subcategory, value) {
    let newNav = navigation;
    newNav.items[category].items[subcategory].hidden = value;
    setNavigation(newNav);
  }

  const [footerNav, setFooterNav] = useState({});

  async function sendFooterNavRequest() {
    // doesn't work on first page render
    const footerNavRequest = await getFooterNav().then();

    setFooterNav(footerNavRequest);
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
        footerNav,
        removeCartItem,
        navItemVisible,
        navSubItemVisible,
        resetMenuVisibility,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };
