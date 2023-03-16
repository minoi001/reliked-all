import Link from "next/link";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { AccountContext } from "../context/accountContext";
import MiniCart from "./MiniCart";
import AccountMenu from "./AccountMenu";
import Image from "next/image";
export default function Nav() {
  const { cart, cartOpen, setCartOpen, headerContent } =
    useContext(ShopContext);
  const { getUserInfo } = useContext(AccountContext);

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  return (
    <div>
      <header className="border-b stick top-0 z-20 bg-white">
        <div className="flex item-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
          <Link href="/" passHref>
            <div className="cursor-pointer">
              <Image
                src={headerContent.logo}
                alt="Reliked"
                width="135"
                height="135"
              />
            </div>
          </Link>
          <div className="text-md font-bold cursor-pointer">
            <AccountMenu account="account info" />
            <a
              onClick={() => {
                setCartOpen(!cartOpen);
              }}
            >
              Cart ({cartQuantity})
            </a>
            <MiniCart cart={cart} />
          </div>
        </div>
      </header>
    </div>
  );
}
